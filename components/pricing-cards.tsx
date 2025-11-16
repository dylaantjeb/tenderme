"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const pricingPlans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Perfect for trying out TenderAI",
    features: [
      "1 lifetime tender proposal",
      "Basic AI generation",
      "English language only",
      "Standard templates",
      "Email support",
    ],
    limitations: ["Limited to 1 tender total", "No multi-language support"],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Starter",
    price: "€199",
    period: "per month",
    description: "Ideal for small businesses and freelancers",
    features: [
      "5 tender proposals per month",
      "Multi-language support (EN/NL/DE/FR)",
      "PDF intelligence & auto-extract",
      "Sector-specific templates",
      "Basic tender matching",
      "Priority email support",
      "Version control",
    ],
    limitations: ["5 tenders per month limit"],
    buttonText: "Choose Starter",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Pro",
    price: "€499",
    period: "per month",
    description: "Perfect for growing companies",
    features: [
      "20 tender proposals per month",
      "Advanced AI generation",
      "Multi-language support (EN/NL/DE/FR)",
      "Advanced PDF intelligence",
      "Premium sector templates",
      "Smart tender matching with alerts",
      "Team collaboration tools",
      "Priority phone & email support",
      "Custom branding",
      "Analytics dashboard",
    ],
    limitations: ["20 tenders per month limit"],
    buttonText: "Choose Pro",
    buttonVariant: "default" as const,
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited tender proposals",
      "Custom AI model training",
      "All language support + custom languages",
      "Advanced PDF intelligence with OCR",
      "Custom templates and frameworks",
      "Enterprise tender matching",
      "Advanced team management",
      "Dedicated account manager",
      "Custom integrations & API access",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    limitations: [],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
]

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {pricingPlans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative"
        >
          <Card
            className={`glassmorphic border-border h-full flex flex-col relative ${
              plan.popular ? "ring-2 ring-primary" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-2">/{plan.period}</span>}
              </div>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
            </CardHeader>

            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="text-xs text-muted-foreground">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>

            <CardFooter className="pt-6">
              {plan.name === "Enterprise" ? (
                <Link href="/contact" className="w-full">
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </Button>
                </Link>
              ) : (
                <Link href="/register" className="w-full">
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
