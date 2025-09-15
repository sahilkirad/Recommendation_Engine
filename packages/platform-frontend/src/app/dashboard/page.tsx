// File: packages/platform-frontend/src/app/dashboard/page.tsx
'use client'; // HOCs that use hooks need to be in a client component
import DashboardLayout from "@/components/layout/DashboardLayout";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import withAuth from "@/components/auth/withAuth"; // Import our new HOC
function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your agent.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* API Key Component */}
        <div className="lg:col-span-2">
          <ApiKeyDisplay />
        </div>

        {/* Quick Start Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox id="get-key" checked disabled />
              <label htmlFor="get-key" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Get API Key
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="upload-catalog" />
              <label htmlFor="upload-catalog" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload Catalog
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="integrate" />
              <label htmlFor="integrate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Integrate Snippet
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Usage Analytics Cards */}
        <Card>
          <CardHeader>
            <CardTitle>API Calls This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,402,831</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Events Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5.2M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12.4k</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


// Wrap the component with the HOC before exporting
export default withAuth(DashboardPage);