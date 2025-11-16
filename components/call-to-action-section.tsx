"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function CallToActionSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to win your next tender?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
            New accounts get one tender proposal completely free. No credit card required. Start winning more bids
            today.
          </p>
          <Link href="/wizard">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold"
            >
              Start Your Free Tender
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
