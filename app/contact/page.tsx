import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Contact Us - TenderAI",
  description: "Get in touch with TenderAI. We're here to help you win more tenders with AI-powered proposals.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Get in Touch</h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Have questions about TenderAI? Need help with your tender proposals? We're here to help you succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose TenderAI?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-foreground">AI-Powered Generation</h3>
                        <p className="text-muted-foreground text-sm">
                          Create winning tender proposals in minutes, not hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-foreground">Multi-Language Support</h3>
                        <p className="text-muted-foreground text-sm">
                          Generate proposals in English, Dutch, German, and French
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-foreground">Expert Support</h3>
                        <p className="text-muted-foreground text-sm">
                          Get help from our tender experts and AI specialists
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphic rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Enterprise Solutions</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Need custom AI training, unlimited tenders, or dedicated support? Our enterprise team can help you
                    scale your tender success.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p>📧 enterprise@tenderai.com</p>
                    <p>📞 +31 20 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
