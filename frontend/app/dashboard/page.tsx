import { DashboardLayout } from "@/components/dashboard-layout"
import { QuickStartChecklist } from "@/components/quick-start-checklist"
import { ApiKeyDisplay } from "@/components/api-key-display"
import { UsageAnalytics } from "@/components/usage-analytics"
import { ActivityChart } from "@/components/activity-chart"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your AI agent performance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickStartChecklist />
          <ApiKeyDisplay />
        </div>

        <UsageAnalytics />
        <ActivityChart />
      </div>
    </DashboardLayout>
  )
}
