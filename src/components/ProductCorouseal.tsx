"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProductData } from "@/sanity/lib/fetchData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  // Limit to 7 products
  const limitedProducts = products.slice(0, 7);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3, // Adjust based on how many products you want to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Centered Heading and Description */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Top Picks For You</h2>
        <p className="text-muted-foreground">
          Find a bright ideal to suit your taste with our great selection of
          suspension, floor, and table lights.
        </p>
      </div>

      <div className="carousel-container">
        <Slider {...settings}>
          {limitedProducts.map((product) => (
            <div key={product._id} className="product-slide">
              <Link href={`/shop/${product.slug}`}>
                <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-lg border-none shadow-sm h-[600px] mx-2">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative overflow-hidden h-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        layout="fill" // Use fill to cover the full height
                        objectFit="cover" // Cover the container
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="text-lg font-medium line-clamp-2 hover:text-primary transition-colors duration-300">
                      {product.title}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
