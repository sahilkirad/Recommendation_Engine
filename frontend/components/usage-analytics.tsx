import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UsageAnalytics() {
  const metrics = [
    {
      title: "API Calls This Month",
      value: "1,402,831",
    },
    {
      title: "Events Tracked",
      value: "5.2M",
    },
    {
      title: "Active Users",
      value: "12.4k",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
