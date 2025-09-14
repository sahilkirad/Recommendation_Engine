import { DashboardLayout } from "@/components/dashboard-layout"
import { FileUploader } from "@/components/file-uploader"
import { CatalogTable } from "@/components/catalog-table"

export default function CatalogPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Catalog Management</h1>
          <p className="text-muted-foreground mt-2">Upload and manage your product catalog for AI recommendations.</p>
        </div>

        <FileUploader />
        <CatalogTable />
      </div>
    </DashboardLayout>
  )
}
