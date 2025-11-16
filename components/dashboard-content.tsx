"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { FileText, Plus, TrendingUp, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  name: string
  email: string
  plan: string
  tendersUsed: number
  tendersLimit: number
  joinDate: string
}

const usageData = [
  { month: "Jan", tenders: 2 },
  { month: "Feb", tenders: 4 },
  { month: "Mar", tenders: 3 },
  { month: "Apr", tenders: 5 },
  { month: "May", tenders: 1 },
  { month: "Jun", tenders: 3 },
]

export function DashboardContent() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("tenderai_token")
    if (!token) {
      router.push("/login")
      return
    }

    // Get user data (in real app, this would come from API)
    const storedUser = localStorage.getItem("tenderai_user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData({
        name: user.name,
        email: user.email,
        plan: "Starter",
        tendersUsed: 3,
        tendersLimit: 5,
        joinDate: "March 2024",
      })
    }
  }, [router])

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const usagePercentage = (userData.tendersUsed / userData.tendersLimit) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userData.name}</h1>
          <p className="text-muted-foreground">Here's your tender management overview</p>
        </div>
        <Link href="/wizard">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            New Tender
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glassmorphic border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userData.plan}</div>
            <p className="text-xs text-muted-foreground">€199/month</p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tenders Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {userData.tendersUsed}/{userData.tendersLimit}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">78%</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Member Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{userData.joinDate}</div>
            <p className="text-xs text-muted-foreground">Active user</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Usage Progress */}
        <Card className="glassmorphic border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Usage</CardTitle>
            <p className="text-sm text-muted-foreground">
              You've used {userData.tendersUsed} of {userData.tendersLimit} tenders this month
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Usage</span>
                <span className="text-foreground">{Math.round(usagePercentage)}%</span>
              </div>
              <Progress value={usagePercentage} className="h-3" />
            </div>
            <div className="flex justify-between items-center">
              <Badge variant={usagePercentage > 80 ? "destructive" : "secondary"}>
                {userData.tendersLimit - userData.tendersUsed} remaining
              </Badge>
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Usage Chart */}
        <Card className="glassmorphic border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Usage History</CardTitle>
            <p className="text-sm text-muted-foreground">Tenders created over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="tenders" fill="#6c6ff5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glassmorphic border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/wizard">
              <Button variant="outline" className="w-full justify-start border-border bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Create New Tender
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="w-full justify-start border-border bg-transparent">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start border-border bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              View Past Tenders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
