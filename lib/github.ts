import type { GitHubStats } from "@/types";

const GITHUB_USERNAME = "Avijitsaha94"; // ← তোমার GitHub username

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", PHP: "#4F5D95",
};

export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((acc: number, repo: { stargazers_count: number }) => acc + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((acc: number, repo: { forks_count: number }) => acc + (repo.forks_count || 0), 0);

    const langMap: Record<string, number> = {};
    repos.forEach((repo: { language: string | null; size: number }) => {
      if (repo.language) langMap[repo.language] = (langMap[repo.language] || 0) + repo.size;
    });
    const totalSize = Object.values(langMap).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a).slice(0, 5)
      .map(([name, size]) => ({ name, percentage: Math.round((size / totalSize) * 100), color: LANG_COLORS[name] || "#6e7681" }));

    return { totalCommits: 0, totalRepos: user.public_repos, totalStars, totalForks, followers: user.followers, topLanguages, contributionStreak: 0 };
  } catch { return null; }
}
