import { NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const stats = await getGitHubStats();
  if (!stats) return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  return NextResponse.json(stats);
}
