'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import apiClient from '@/lib/api';
import withAuth from '@/components/auth/withAuth';
import { Loader2 } from 'lucide-react';

function CatalogPage() {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const fetchCatalog = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/v1/catalog');
      setCatalog(response.data);
    } catch (error) {
      console.error("Failed to fetch catalog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }
    setUploadStatus('Uploading...');
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await apiClient.post('/api/v1/catalog/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Upload successful!');
      fetchCatalog(); // Refresh the catalog list
    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error("Upload error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Catalog Management</h1>
        <p className="text-muted-foreground">Sync your product catalog with your NexusAI agent.</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="catalog-file">Upload New Catalog (CSV)</Label>
          <div className="flex items-center gap-2">
            <Input id="catalog-file" type="file" accept=".csv" className="flex-1" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload</Button>
          </div>
          {uploadStatus && <p className="text-sm text-muted-foreground">{uploadStatus}</p>}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {catalog.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default withAuth(CatalogPage);