import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Avijit Saha.",
};

export default function ContactPage() {
  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
