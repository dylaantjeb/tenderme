import { Navigation } from "@/components/navigation"
import { PricingCards } from "@/components/pricing-cards"
import { PricingFAQ } from "@/components/pricing-faq"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Choose the perfect plan for your tender needs. Start free and scale as you grow.
            </p>
          </div>
          <PricingCards />
          <PricingFAQ />
        </div>
      </main>
    </div>
  )
}
