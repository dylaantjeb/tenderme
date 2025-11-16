import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { CallToActionSection } from "@/components/call-to-action-section"
import { StepsSection } from "@/components/steps-section"
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <StepsSection /> 
        <FeatureCards />
        <CallToActionSection />
      </main>
    </div>
  )
}