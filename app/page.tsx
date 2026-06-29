import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import GitHubStats from "@/components/sections/GitHubStats";
import { getGitHubStats } from "@/lib/github";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const githubStats = await getGitHubStats();
  const featuredProjects = getFeaturedProjects();
  return (
    <>
      <LoadingScreen />
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects projects={featuredProjects} />
        <Skills />
        <Experience />
        <GitHubStats stats={githubStats} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
