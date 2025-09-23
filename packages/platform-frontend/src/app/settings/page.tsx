// File: packages/platform-frontend/src/app/settings/page.tsx
'use client';

import DashboardLayout from "@/components/layout/DashboardLayout";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import withAuth from "@/components/auth/withAuth";

function SettingsPage() {
  // In a real app, you'd fetch the user's email here
  const userEmail = "developer@example.com"; 

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and API settings.</p>
      </div>
      <div className="grid gap-6">
        <ApiKeyDisplay />
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm"><strong>Email:</strong> {userEmail}</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(SettingsPage);