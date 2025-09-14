"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export function CodeBlock() {
  const [copied, setCopied] = useState(false)

  const codeSnippet = `const response = await axios.post('https://api.nexusai.com/v1/recommend', {
  userId: 'user_123',
  context: {
    category: 'electronics',
    budget: 500,
    preferences: ['gaming', 'portable']
  }
});`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-card border border-border rounded-lg p-6 text-left">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground font-mono">JavaScript</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="text-sm text-card-foreground font-mono overflow-x-auto">
        <code>{codeSnippet}</code>
      </pre>
    </div>
  )
}
