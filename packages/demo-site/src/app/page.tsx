'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from "@/components/Header";
import ProductCard, { Product } from "@/components/ProductCard";
import apiClient from '@/lib/api';
import { getVisitorId } from '@/components/TrackingProvider';
import { Loader2, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [headline, setHeadline] = useState("Recommended For You"); // Add state for the headline
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const visitorId = getVisitorId();
    
    try {
      const response = await apiClient.post('/api/v1/recommend', { visitor_id: visitorId });
      
      if (response.data.recommendations && response.data.recommendations.length > 0) {
         setHeadline(response.data.headline || "Recommended For You"); // Set the dynamic headline
          const recommendedProducts = response.data.recommendations.map((rec: any) => ({
            id: rec.item_id,
            name: rec.item_id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            category: rec.item_id.split('-')[0],
            reason: rec.reason,
          }));
          setProducts(recommendedProducts);
      } else {
           setHeadline("Fresh Finds For You"); // Set a fallback headline
           const fallbackProducts = [
            { id: 'JKT-007', name: 'Blue Denim Jacket', category: 'Jackets', reason: "A popular choice to get you started." },
            { id: 'SHOE-045', name: 'Leather Sneakers', category: 'Footwear', reason: "A timeless and versatile bestseller." },
         ];
         setProducts(fallbackProducts);
      }
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setError("Could not load recommendations. Is the backend server running?");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const handleProductClick = async (productId: string) => {
    const visitorId = getVisitorId();
    try {
      // Send the track event but don't wait for it
      apiClient.post('/api/v1/track', {
        visitor_id: visitorId,
        event: 'click_product',
        data: { product_id: productId }
      });
      
      // Immediately re-fetch the recommendations to update the UI
      await fetchRecommendations();

    } catch (error) {
      console.error("Failed to track or re-fetch:", error);
    }
  };

  const productsWithImages = products.map(p => ({
      ...p,
      imageUrl: `https://source.unsplash.com/400x400/?${p.category.toLowerCase()}`
  }));

   return (
    <div>
      <Header />
      <main className="p-8">
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-6">{headline}</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <TooltipProvider>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsWithImages.map((product) => (
                  <div key={product.id}>
                    <div onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                      <ProductCard product={product} />
                    </div>
                    {product.reason && (
                      <div className="flex items-center gap-2 mt-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        {/* --- THIS IS THE LINE TO CHANGE --- */}
                        <p className="text-xs text-muted-foreground italic">{product.reason}</p>
                        {/* --- END OF CHANGE --- */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TooltipProvider>
          )}
        </section>
      </main>
    </div>
  );
}