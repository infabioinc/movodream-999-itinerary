"use client";

import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Introduction from "@/components/Introduction";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Personas from "@/components/Personas";
import TrustSection from "@/components/TrustSection";
import Value from "@/components/Value";
import SocialProof from "@/components/SocialProof";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";

export default function Home() {
  return (
    <SmoothScroll>
      <MouseGlow />
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Introduction />
        <HowItWorks />
        <Features />
        <Personas />
        <TrustSection />
        <Value />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
