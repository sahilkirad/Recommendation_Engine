"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function QuickStartChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    apiKey: false,
    catalog: false,
    integration: false,
  })

  const tasks = [
    { id: "apiKey", label: "Get API Key" },
    { id: "catalog", label: "Upload Catalog" },
    { id: "integration", label: "Integrate Snippet" },
  ]

  const handleCheck = (taskId: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [taskId]: checked }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start Guide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-3">
            <Checkbox
              id={task.id}
              checked={checkedItems[task.id]}
              onCheckedChange={(checked) => handleCheck(task.id, checked as boolean)}
            />
            <label
              htmlFor={task.id}
              className={`text-sm font-medium cursor-pointer ${
                checkedItems[task.id] ? "line-through text-muted-foreground" : "text-foreground"
              }`}
            >
              {task.label}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
