import { DashboardLayout } from "@/components/dashboard-layout"
import { RulesTable } from "@/components/rules-table"

export default function RulesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Rules</h1>
          <p className="text-muted-foreground mt-2">Configure AI behavior with custom business rules and conditions.</p>
        </div>

        <RulesTable />
      </div>
    </DashboardLayout>
  )
}
