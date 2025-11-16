"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, ArrowLeft, ArrowRight, FileText, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WizardData {
  language: string
  sector: string
  tenderTitle: string
  cpvCodes: string
  deadline: string
  tenderValue: string
  companyName: string
  keywords: string
  requirements: string
}

interface TenderResponse {
  success: boolean
  proposal?: string
  metadata?: {
    generatedAt: string
    wordCount: number
    language: string
    sector: string
    tenderTitle: string
  }
  error?: string
}

const steps = [
  { id: 1, title: "Basic Information", description: "Tell us about your tender" },
  { id: 2, title: "Technical Details", description: "Provide specific requirements" },
  { id: 3, title: "Company Information", description: "Your company details" },
  { id: 4, title: "Review & Generate", description: "Confirm and create proposal" },
]

export function TenderWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [generatedProposal, setGeneratedProposal] = useState<TenderResponse | null>(null)
  const [wizardData, setWizardData] = useState<WizardData>({
    language: "",
    sector: "",
    tenderTitle: "",
    cpvCodes: "",
    deadline: "",
    tenderValue: "",
    companyName: "",
    keywords: "",
    requirements: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-tender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wizardData),
      })

      const result: TenderResponse = await response.json()

      if (result.success) {
        setGeneratedProposal(result)
        setIsComplete(true)
      } else {
        console.error("Failed to generate proposal:", result.error)
        // You could add error state handling here
      }
    } catch (error) {
      console.error("Error calling API:", error)
      // You could add error state handling here
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedProposal?.proposal) return

    const blob = new Blob([generatedProposal.proposal], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${wizardData.tenderTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_proposal.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (field: keyof WizardData, value: string) => {
    setWizardData((prev) => ({ ...prev, [field]: value }))
  }

  if (isComplete) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <Card className="glassmorphic border-border max-w-4xl mx-auto">
          <CardContent className="p-12">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tender Proposal Generated!</h2>
            <p className="text-muted-foreground mb-8">
              Your AI-powered tender proposal has been successfully created using advanced AI technology.
            </p>

            {generatedProposal?.metadata && (
              <div className="bg-muted/20 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-foreground mb-2">Proposal Details:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong>Word Count:</strong> {generatedProposal.metadata.wordCount}
                  </div>
                  <div>
                    <strong>Language:</strong> {generatedProposal.metadata.language}
                  </div>
                  <div>
                    <strong>Sector:</strong> {generatedProposal.metadata.sector}
                  </div>
                  <div>
                    <strong>Generated:</strong> {new Date(generatedProposal.metadata.generatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {generatedProposal?.proposal && (
              <div className="bg-muted/10 rounded-lg p-4 mb-6 text-left max-h-60 overflow-y-auto">
                <h3 className="font-semibold text-foreground mb-2">Proposal Preview:</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {generatedProposal.proposal.substring(0, 500)}...
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download Proposal (TXT)
              </Button>
              <div className="text-sm text-muted-foreground">
                <Badge variant="outline" className="mb-2">
                  Coming Soon
                </Badge>
                <p>DOCX export and PDF upload for auto-extract will be available in the next update.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center max-w-[120px]">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                  step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <div className="text-xs text-muted-foreground">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      <Card className="glassmorphic border-border">
        <CardHeader>
          <CardTitle className="text-foreground">{steps[currentStep - 1].title}</CardTitle>
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={wizardData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="nl">Dutch</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Select value={wizardData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="it">IT & Technology</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="tenderTitle">Tender Title</Label>
                    <Input
                      id="tenderTitle"
                      placeholder="Enter the tender title"
                      value={wizardData.tenderTitle}
                      onChange={(e) => handleInputChange("tenderTitle", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cpvCodes">CPV Codes</Label>
                      <Input
                        id="cpvCodes"
                        placeholder="e.g., 45000000-7, 72000000-5"
                        value={wizardData.cpvCodes}
                        onChange={(e) => handleInputChange("cpvCodes", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={wizardData.deadline}
                        onChange={(e) => handleInputChange("deadline", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenderValue">Tender Value (EUR)</Label>
                    <Input
                      id="tenderValue"
                      placeholder="e.g., 500000"
                      value={wizardData.tenderValue}
                      onChange={(e) => handleInputChange("tenderValue", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="e.g., sustainable, innovative, cost-effective"
                      value={wizardData.keywords}
                      onChange={(e) => handleInputChange("keywords", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                      value={wizardData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any specific requirements or notes for this tender..."
                      value={wizardData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      className="bg-input border-border min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Generate</h3>
                    <p className="text-muted-foreground">
                      Review your information and generate your AI-powered tender proposal using Groq AI.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-foreground">Language:</strong> {wizardData.language}
                    </div>
                    <div>
                      <strong className="text-foreground">Sector:</strong> {wizardData.sector}
                    </div>
                    <div className="md:col-span-2">
                      <strong className="text-foreground">Title:</strong> {wizardData.tenderTitle}
                    </div>
                    <div>
                      <strong className="text-foreground">Value:</strong> €{wizardData.tenderValue}
                    </div>
                    <div>
                      <strong className="text-foreground">Deadline:</strong> {wizardData.deadline}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="border-border bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep === steps.length ? (
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                Generate Proposal
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
