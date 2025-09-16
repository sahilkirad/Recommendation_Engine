// File: packages/demo-site/src/components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';

// This component is fully dynamic and accepts product data as props
export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        {/* Using aspect-ratio to maintain a consistent image size */}
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}