"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Linkedin,
  Twitter,
  Heart,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/components/wishlist-context";
import { toast } from "react-toastify";
import { urlFor } from "@/sanity/lib/image";
import { fetchSingleProductWithReviews } from "@/sanity/lib/fetchData";
import { useParams } from "next/navigation";
import RelatedProduct from "../../../components/RelatedProduct";
import Feature from "../../../components/Feature";
import CommentSection from "../../../components/Comment"; // Import the Comment component

interface Product {
  reviews: any;
  _id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  discountPercentage: number;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  quantity: number;
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!params.slug) return;

    async function fetchProduct() {
      try {
        const productData = await fetchSingleProductWithReviews(params.slug);
        setProduct(productData);
        setIsInWishlist(
          wishlistState.items.some((item) => item.id === productData._id)
        );
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details.");
      }
    }

    fetchProduct();
  }, [params.slug, wishlistState.items]);

  const updateQuantity = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const addToCart = () => {
    if (!product) return;

    const discountedPrice =
      product.discountPercentage > 0
        ? (product.price * (100 - product.discountPercentage)) / 100
        : product.price;

    const cartItem: CartItem = {
      id: product._id,
      name: product.title,
      price: discountedPrice,
      originalPrice: product.price,
      discountPercentage: product.discountPercentage,
      image: product.image,
      quantity,
    };

    cartDispatch({ type: "ADD_TO_CART", payload: cartItem });
    toast.success("Product added to cart!");
  };

  const toggleWishlist = () => {
    if (!product) return;

    if (isInWishlist) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
      toast.info("Removed from wishlist");
    } else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: {
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.image,
        },
      });
      toast.dark("Added to wishlist");
    }
    setIsInWishlist(!isInWishlist);
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const images = [
    urlFor(product.image).url(),
    urlFor(product.image).url(),
    urlFor(product.image).url(),
    urlFor(product.image).url(),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {images.map((img, index) => (
              <button
                key={index}
                className={`border-2 ${index === selectedImage ? "border-[#B88E2F]" : "border-transparent"} hover:border-[#B88E2F] transition-colors duration-200`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-[70px] bg-[#FFF9E5] h-[70px] md:w-[100px] md:h-[100px]"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 h-auto bg-[#FFF9E5] mb-28 order-1 md:order-2">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt="Product main view"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl text-[#3A3A3A]">{product.title}</h1>
          <div className="flex items-center gap-4">
            {product.discountPercentage > 0 ? (
              <>
                <div className="text-2xl text-red-500">
                  ${" "}
                  {(
                    (product.price * (100 - product.discountPercentage)) /
                    100
                  ).toLocaleString()}
                </div>
                <div className="text-xl text-gray-500 line-through">
                  $ {product.price.toLocaleString()}
                </div>
                <div className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                  {product.discountPercentage}% OFF
                </div>
              </>
            ) : (
              <div className="text-2xl text-[#3A3A3A]">
                $ {product.price.toLocaleString()}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-[#3A3A3A] text-sm">
              {product.reviews.length} Customer Review
              {product.reviews.length !== 1 ? "s" : ""}
            </span>
          </div>

          <p className="text-[#3A3A3A] text-base">{product.description}</p>
          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[#D9D9D9] rounded-md w-32">
              <button
                className="w-10 h-14 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                onClick={() => updateQuantity(quantity - 1)}
              >
                <Minus className="w-4 h-4 text-[#3A3A3A]" />
              </button>
              <span className="px-2 text-[#3A3A3A]">{quantity}</span>
              <button
                className="w-10 h-10 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                onClick={() => updateQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4 text-[#3A3A3A]" />
              </button>
            </div>
            <Button
              className="h-14 bg-black hover:bg-b text-white flex items-center justify-center w-36"
              onClick={addToCart}
            >
              Add To Cart
            </Button>
          </div>

          {/* Product Meta */}
          <div className="space-y-4 pt-6 border-t border-[#D9D9D9]">
            <div className="flex gap-2">
              <span className="text-[#3A3A3A]">SKU</span>
              <span className="text-[#9F9F9F]">
                : {product._id.padStart(6, "0")}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#3A3A3A]">Category</span>
              <span className="text-[#9F9F9F]">: {product.category}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#3A3A3A]">Tags</span>
              <span className="text-[#9F9F9F]">: Sofa chair Bed</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <span className="text-[#3A3A3A]">Share</span>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-lg hover:bg-amber-500 hover:shadow-xl transition duration-200 transform hover:scale-105">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-lg hover:bg-amber-500 hover:shadow-xl transition duration-200 transform hover:scale-105">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-lg hover:bg-amber-500 hover:shadow-xl transition duration-200 transform hover:scale-105">
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button
                className="hover:text-[#B88E2F] transition-colors duration-200"
                onClick={toggleWishlist}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isInWishlist ? "#B88E2F" : "none"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Comment Section */}
      <div className="mt-16">
        <div className="flex gap-8 border-b justify-center border-gray-200 mb-8">
          {["description", "additional", "comments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-lg font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {activeTab === "description" && (
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          {activeTab === "additional" && (
            <div className="text-gray-600 leading-relaxed">
              <h3 className="text-lg font-semibold mb-2">
                Product Specifications
              </h3>
              <div className="mb-4">
                <strong>Material:</strong> Premium quality wood frame with
                high-density foam cushions and durable upholstery.
              </div>
              <div className="mb-4">
                <strong>Dimensions:</strong> 78 x 34 x 30 inches (L x W x H).
              </div>
              <div className="mb-4">
                <strong>Weight:</strong> 120 lbs.
              </div>
              <div className="mb-4">
                <strong>Color Options:</strong> Available in gray, beige, and
                navy blue.
              </div>
              <div className="mb-4">
                <strong>Warranty:</strong> 2-year manufacturer warranty on frame
                and upholstery.
              </div>
              <div className="mb-4">
                <strong>Care Instructions:</strong> Spot clean with a damp
                cloth; do not use harsh chemicals.
              </div>
              <div className="mb-4">
                <strong>Assembly:</strong> Some assembly required; tools
                included.
              </div>
              <div className="mb-4">
                <strong>Features:</strong>
                <ul className="list-disc list-inside">
                  <li>Comfortable seating for up to 4 people.</li>
                  <li>Modern design fits well in any living room.</li>
                  <li>Removable and washable cushion covers.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "comments" && <CommentSection />}
        </div>
        <RelatedProduct />
      </div>
      <Feature />
    </div>
  );
}
