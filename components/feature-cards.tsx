"use client"

import { motion } from "framer-motion"
import { Globe, Search, FileText, Layers } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Multi-language Support",
    description:
      "Generate documents in English, Dutch, German, and French with native-level fluency and cultural awareness.",
  },
  {
    icon: Search,
    title: "Smart Tender Matching",
    description:
      '"This tender fits your profile!" Our AI uses advanced rules and embeddings to find perfect opportunities.',
  },
  {
    icon: FileText,
    title: "PDF Intelligence",
    description:
      "Auto-extract criteria, CPV codes, and deadlines from tender documents. Upload PDFs for instant analysis.",
  },
  {
    icon: Layers,
    title: "Sector Templates",
    description: "Quality frameworks with version control and collaboration tools tailored to your industry sector.",
  },
]

export function FeatureCards() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Everything you need to win
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Powerful AI features designed to streamline your tender process and increase your success rate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glassmorphic rounded-xl p-8 hover:bg-card/80 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
