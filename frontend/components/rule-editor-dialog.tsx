"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Rule {
  id: string
  name: string
  condition: string
  action: string
  status: "active" | "inactive"
}

interface RuleEditorDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (rule: Omit<Rule, "id">) => void
  editingRule: Rule | null
}

export function RuleEditorDialog({ isOpen, onClose, onSave, editingRule }: RuleEditorDialogProps) {
  const [ruleName, setRuleName] = useState("")
  const [conditionField, setConditionField] = useState("")
  const [conditionOperator, setConditionOperator] = useState("")
  const [conditionValue, setConditionValue] = useState("")
  const [actionType, setActionType] = useState("")
  const [actionValue, setActionValue] = useState("")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  useEffect(() => {
    if (editingRule) {
      setRuleName(editingRule.name)
      setStatus(editingRule.status)

      // Parse condition (simplified parsing for demo)
      const conditionParts = editingRule.condition.split(" ")
      if (conditionParts.length >= 3) {
        setConditionField(conditionParts[1] || "")
        setConditionOperator(conditionParts[2] || "")
        setConditionValue(conditionParts[3] || "")
      }

      // Parse action (simplified parsing for demo)
      const actionParts = editingRule.action.split(" ")
      if (actionParts.length >= 4) {
        setActionType(`${actionParts[0]} ${actionParts[1]} ${actionParts[2]}`)
        setActionValue(actionParts[3] || "")
      }
    } else {
      // Reset form for new rule
      setRuleName("")
      setConditionField("")
      setConditionOperator("")
      setConditionValue("")
      setActionType("")
      setActionValue("")
      setStatus("active")
    }
  }, [editingRule, isOpen])

  const handleSave = () => {
    const condition = `IF ${conditionField} ${conditionOperator} ${conditionValue}`
    const action = `${actionType} ${actionValue}`

    onSave({
      name: ruleName,
      condition,
      action,
      status,
    })
  }

  const isFormValid = ruleName && conditionField && conditionOperator && conditionValue && actionType && actionValue

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingRule ? "Edit Business Rule" : "Create a New Business Rule"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="Enter rule name"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Condition</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">IF</span>
              <Select value={conditionField} onValueChange={setConditionField}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">category</SelectItem>
                  <SelectItem value="brand">brand</SelectItem>
                  <SelectItem value="price">price</SelectItem>
                  <SelectItem value="season">season</SelectItem>
                </SelectContent>
              </Select>
              <Select value={conditionOperator} onValueChange={setConditionOperator}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="IS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IS">IS</SelectItem>
                  <SelectItem value="IS NOT">IS NOT</SelectItem>
                  <SelectItem value="CONTAINS">CONTAINS</SelectItem>
                  <SelectItem value=">">&gt;</SelectItem>
                  <SelectItem value="<">&lt;</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Value"
                value={conditionValue}
                onChange={(e) => setConditionValue(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Action</Label>
            <div className="flex items-center space-x-2">
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boost score by">Boost score by</SelectItem>
                  <SelectItem value="Reduce score by">Reduce score by</SelectItem>
                  <SelectItem value="Set priority to">Set priority to</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Value (e.g., 30%)"
                value={actionValue}
                onChange={(e) => setActionValue(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value: "active" | "inactive") => setStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid}>
            Save Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
