// File: packages/platform-frontend/src/components/dashboard/ApiKeyDisplay.tsx
'use client'; // This is a client component because it uses state and interactivity

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ClipboardCopy, Check } from 'lucide-react';

export default function ApiKeyDisplay() {
  const apiKey = 'pk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // This will be dynamic later
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const maskedKey = `pk_live_...${apiKey.slice(-4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your API Key</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 p-2 border rounded-md bg-muted">
          <span className="flex-1 font-mono text-sm">
            {isRevealed ? apiKey : maskedKey}
          </span>
          <Button variant="ghost" size="icon" onClick={() => setIsRevealed(!isRevealed)}>
            {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}