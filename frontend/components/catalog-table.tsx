"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

// Sample catalog data
const catalogData = [
  {
    item_id: "PROD001",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    item_url: "https://example.com/products/wireless-headphones",
  },
  {
    item_id: "PROD002",
    name: "Gaming Mechanical Keyboard",
    category: "Electronics",
    item_url: "https://example.com/products/gaming-keyboard",
  },
  {
    item_id: "PROD003",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    item_url: "https://example.com/products/office-chair",
  },
  {
    item_id: "PROD004",
    name: "Stainless Steel Water Bottle",
    category: "Home & Garden",
    item_url: "https://example.com/products/water-bottle",
  },
  {
    item_id: "PROD005",
    name: "Portable Phone Charger",
    category: "Electronics",
    item_url: "https://example.com/products/phone-charger",
  },
  {
    item_id: "PROD006",
    name: "Cotton Blend T-Shirt",
    category: "Clothing",
    item_url: "https://example.com/products/cotton-tshirt",
  },
  {
    item_id: "PROD007",
    name: "LED Desk Lamp",
    category: "Home & Garden",
    item_url: "https://example.com/products/desk-lamp",
  },
  {
    item_id: "PROD008",
    name: "Wireless Mouse",
    category: "Electronics",
    item_url: "https://example.com/products/wireless-mouse",
  },
]

export function CatalogTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = catalogData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Catalog</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Item URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.item_id}>
                    <TableCell className="font-mono text-sm">{item.item_id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <a
                        href={item.item_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm truncate block max-w-xs"
                      >
                        {item.item_url}
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No products found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {filteredData.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredData.length} of {catalogData.length} products
          </div>
        )}
      </CardContent>
    </Card>
  )
}
