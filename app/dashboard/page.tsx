import { Navigation } from "@/components/navigation"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <DashboardContent />
      </main>
    </div>
  )
}
