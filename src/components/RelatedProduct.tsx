"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchProductData } from "@/sanity/lib/fetchData";

interface Product {
  _id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = (await fetchProductData()) as Product[];
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  // Limit to 4 products
  const limitedProducts = products.slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Heading for Related Products */}
      <h2 className="text-center text-2xl font-bold mb-6">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {limitedProducts.map((product) => (
          <Card
            key={product._id}
            className="group relative overflow-hidden transition-all duration-500 hover:shadow-lg border-none shadow-sm h-[400px] w-full" // Set a fixed height and width
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden h-80">
                {" "}
                {/* Increased height for the image container */}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  layout="fill" // Use layout fill to cover the area
                  objectFit="cover" // Ensure the image covers the area
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Link href={`/shop/${product.slug}`}>
                <CardTitle className="text-lg font-medium line-clamp-2 hover:text-primary transition-colors duration-300">
                  {product.title}
                </CardTitle>
              </Link>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                {/* Additional footer content can go here */}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
