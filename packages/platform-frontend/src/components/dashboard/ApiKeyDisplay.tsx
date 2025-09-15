// File: packages/platform-frontend/src/components/dashboard/ApiKeyDisplay.tsx
'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ClipboardCopy, Check, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api'; // Our API client

export default function ApiKeyDisplay() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  
  // This effect runs once when the component mounts
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await apiClient.get('/api/v1/api-key');
        setApiKey(response.data);
      } catch (err) {
        setError('Failed to fetch API key.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchApiKey();
  }, []); // The empty array means this runs only once

  const maskedKey = apiKey ? `nexus_live_...${apiKey.slice(-4)}` : '';

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Your API Key</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center h-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error || !apiKey) {
    return (
      <Card>
        <CardHeader><CardTitle>Error</CardTitle></CardHeader>
        <CardContent>
          <p className="text-red-500">{error || 'Could not load API key.'}</p>
        </CardContent>
      </Card>
    );
  }

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