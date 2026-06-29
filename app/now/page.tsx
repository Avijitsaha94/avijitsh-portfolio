import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently working on and learning.",
};

// ← এখানে তোমার real info দাও
const nowData = {
  lastUpdated: "June 2026",
  currentlyBuilding: ["My portfolio website (this one!)", "Open to new freelance projects"],
  currentlyLearning: ["Redis for caching", "Docker & containerization", "System design principles"],
  currentlyReading: ["Clean Architecture — Robert C. Martin", "The Pragmatic Programmer"],
  listeningTo: "Lo-fi beats while coding",
  location: "Dhaka, Bangladesh",
  funFact: "I debug better after a cup of tea ☕",
};

export default function NowPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-2xl">
          <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// now</p>
          <h1 className="font-display font-extrabold leading-tight mb-3" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
            What I'm<span className="gradient-text block">Up To.</span>
          </h1>
          <p className="text-muted-foreground mb-2">A snapshot of what I'm focused on right now.</p>
          <p className="text-xs text-muted-foreground font-mono mb-12">
            Last updated: {nowData.lastUpdated} · {nowData.location}
          </p>

          <div className="space-y-10">
            {[
              { label: "🚀 Currently Building", items: nowData.currentlyBuilding },
              { label: "📚 Currently Learning", items: nowData.currentlyLearning },
              { label: "📖 Currently Reading", items: nowData.currentlyReading },
            ].map((section) => (
              <div key={section.label}>
                <h2 className="font-display text-xl font-bold mb-4">{section.label}</h2>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-0.5 flex-shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="font-display text-xl font-bold mb-4">🎵 Listening To</h2>
              <p className="text-muted-foreground">{nowData.listeningTo}</p>
            </div>
            <div className="glass rounded-xl p-5 border border-primary/20">
              <p className="text-sm text-muted-foreground">{nowData.funFact}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
