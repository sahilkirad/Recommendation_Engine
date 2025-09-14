"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ClipboardCopy, Check } from "lucide-react"

export function ApiKeyDisplay() {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const apiKey = "pk_live_1234567890abcdef1234567890abcdef"
  const maskedKey = "pk_live_...a1b2"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your API Key</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">{isVisible ? apiKey : maskedKey}</code>
          <Button variant="outline" size="sm" onClick={toggleVisibility}>
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <ClipboardCopy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
