import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "TenderAI - Win tenders with AI in minutes",
  description:
    "AI-powered tender management platform that generates compliant, persuasive tender documents in multiple languages. Start winning more tenders today.",
  keywords: ["tender", "AI", "proposal", "bidding", "procurement", "multi-language", "automation"],
  authors: [{ name: "TenderAI Team" }],
  creator: "TenderAI",
  publisher: "TenderAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tenderai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TenderAI - Win tenders with AI in minutes",
    description:
      "AI-powered tender management platform that generates compliant, persuasive tender documents in multiple languages.",
    url: "https://tenderai.com",
    siteName: "TenderAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TenderAI - Win tenders with AI in minutes",
    description:
      "AI-powered tender management platform that generates compliant, persuasive tender documents in multiple languages.",
    creator: "@tenderai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
