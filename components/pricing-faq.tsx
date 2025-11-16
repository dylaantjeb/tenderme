"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What happens if I exceed my monthly tender limit?",
    answer:
      "If you reach your monthly limit, you can either upgrade your plan or wait until the next billing cycle. We'll notify you when you're approaching your limit.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "What languages are supported?",
    answer:
      "We support English, Dutch, German, and French for all paid plans. The free plan includes English only. Enterprise customers can request additional languages.",
  },
  {
    question: "How does the PDF intelligence feature work?",
    answer:
      "Our AI automatically extracts key information from tender documents including criteria, CPV codes, deadlines, and requirements. This saves hours of manual work.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use enterprise-grade security with end-to-end encryption. Your tender documents and business information are never shared with third parties.",
  },
]

export function PricingFAQ() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently asked questions</h2>
        <p className="text-muted-foreground">Everything you need to know about TenderAI pricing and features.</p>
      </div>

      <div className="glassmorphic rounded-xl p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-foreground hover:text-primary text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.div>
  )
}
