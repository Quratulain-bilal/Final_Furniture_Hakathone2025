"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProductData } from "@/sanity/lib/fetchData";

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
}

const RelatedProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductData();
        setProducts(data.slice(8, 12)); // Take products 8-12
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Related produts </h2>
        <p className="text-gray-600">
          Find a bright ideal to suit your taste with our great selection of
          suspension, floor, and table lights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
          >
            <Link href={`/shop/${product.slug}`}>
              <div className="aspect-square relative overflow-hidden cursor-pointer">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/shop/${product.slug}`}>
                <h3 className="text-base font-medium line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                  {product.title}
                </h3>
              </Link>
              <p className="text-lg font-semibold mt-2">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10"></div>
    </section>
  );
};

export default RelatedProduct;
