// File: packages/platform-frontend/src/app/catalog/page.tsx
'use client'; // This page is interactive, so it's a client component

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// NOTE: This is placeholder data. In a future step, we will
// dynamically fetch this from our backend API after an upload.
const sampleCatalog = [
  { id: 'JKT-007', name: 'Blue Denim Jacket', category: 'Jackets' },
  { id: 'SHOE-045', name: 'Classic Leather Sneakers', category: 'Footwear' },
  { id: 'PANT-002', name: 'Slim Fit Chinos', category: 'Pants' },
  { id: 'TSHIRT-005', name: 'V-Neck Cotton T-Shirt', category: 'T-Shirts' },
  { id: 'JKT-009', name: 'Black Bomber Jacket', category: 'Jackets' },
];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fileName, setFileName] = useState('');

  const filteredCatalog = sampleCatalog.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
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
          <Label htmlFor="catalog-file">Upload Catalog CSV</Label>
          <div className="flex items-center gap-2">
            <Input id="catalog-file" type="file" className="flex-1" onChange={handleFileChange} />
            <Button>Upload</Button>
          </div>
          {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="search-catalog">Search Catalog</Label>
          <Input
            id="search-catalog"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCatalog.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}