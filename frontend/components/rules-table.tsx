"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, FilePenLine, Trash2 } from "lucide-react"
import { RuleEditorDialog } from "@/components/rule-editor-dialog"

interface Rule {
  id: string
  name: string
  condition: string
  action: string
  status: "active" | "inactive"
}

const sampleRules: Rule[] = [
  {
    id: "1",
    name: "Boost Gaming Products",
    condition: "IF category IS gaming",
    action: "Boost score by 25%",
    status: "active",
  },
  {
    id: "2",
    name: "Seasonal Electronics",
    condition: "IF category IS electronics AND season IS winter",
    action: "Boost score by 15%",
    status: "active",
  },
  {
    id: "3",
    name: "Premium Brand Priority",
    condition: "IF brand IS premium",
    action: "Boost score by 30%",
    status: "inactive",
  },
]

export function RulesTable() {
  const [rules, setRules] = useState<Rule[]>(sampleRules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<Rule | null>(null)

  const handleCreateRule = () => {
    setEditingRule(null)
    setIsDialogOpen(true)
  }

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule)
    setIsDialogOpen(true)
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
  }

  const handleSaveRule = (ruleData: Omit<Rule, "id">) => {
    if (editingRule) {
      // Update existing rule
      setRules(rules.map((rule) => (rule.id === editingRule.id ? { ...ruleData, id: editingRule.id } : rule)))
    } else {
      // Create new rule
      const newRule: Rule = {
        ...ruleData,
        id: Date.now().toString(),
      }
      setRules([...rules, newRule])
    }
    setIsDialogOpen(false)
    setEditingRule(null)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Rules</CardTitle>
          <Button onClick={handleCreateRule}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Rule
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.length > 0 ? (
                  rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell className="font-mono text-sm">{rule.condition}</TableCell>
                      <TableCell className="font-mono text-sm">{rule.action}</TableCell>
                      <TableCell>
                        <Badge variant={rule.status === "active" ? "default" : "secondary"}>
                          {rule.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRule(rule)}
                            className="h-8 w-8 p-0"
                          >
                            <FilePenLine className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRule(rule.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No rules configured. Create your first rule to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <RuleEditorDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingRule(null)
        }}
        onSave={handleSaveRule}
        editingRule={editingRule}
      />
    </>
  )
}
