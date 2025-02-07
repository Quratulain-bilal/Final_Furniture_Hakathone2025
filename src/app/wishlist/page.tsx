"use client";

import React, { useState } from "react";
import { useWishlist } from "@/components/wishlist-context";
import { useCart } from "@/components/cart-context";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Grid, List, Heart } from "lucide-react"; // Import Heart icon for empty state
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Mge from "../../app/wishlist/Mge"
import Feature from "../../components/Feature"

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

const Wishlist = () => {
  const { state, dispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const removeFromWishlist = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
      setIsLoading(false);
    }, 500);
  };

  const addToCart = (item: WishlistItem) => {
    setIsLoading(true);
    setTimeout(() => {
      cartDispatch({
        type: "ADD_TO_CART",
        payload: { ...item, quantity: 1 },
      });
      removeFromWishlist(item.id);
      toast.success("Added to cart!");
      setIsLoading(false);
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Mge />
      <div className="min-h-screen bg-gray-50">
        <div className="mb-8 ml-28 mt-10">
          {/* Optional additional content */}
        </div>

        <div className="text-gray-800 py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-center text-black">
              My Wishlist
            </h1>
            <p className="text-lg text-center text-gray-600">
              Welcome to Your Wishlist! This is your personal space to save and
              track your favorite products. Easily add items you love and
              revisit them anytime to make your shopping experience seamless.
              When youu ready move your desired products to your cart with just
              a click. Start building your wishlist today and never miss out on
              what you truly want.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {state.items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-lg shadow-lg"
            >
              <Heart className="mx-auto h-16 w-16 text-yellow-600 mb-4" />{" "}
              {/* Heart icon for empty wishlist */}
              <p className="text-2xl font-semibold mb-4">
                Your wishlist is empty
              </p>
              <p className="text-gray-600 mb-8">
                Add items that you like to your wishlist
              </p>
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-yellow-600 text-white hover:bg-yellow-700"
                >
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-semibold">
                  {state.items.length} items in your wishlist
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`bg-yellow-600 text-white hover:bg-yellow-700 ${viewMode === "grid" ? "border border-yellow-700" : ""}`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`bg-yellow-600 text-white hover:bg-yellow-700 ${viewMode === "list" ? "border border-yellow-700" : ""}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}
              >
                {state.items.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Card
                      className={`flex ${viewMode === "list" ? "flex-row" : "flex-col"} overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white rounded-lg border border-gray-300`}
                    >
                      <div
                        className={`relative ${viewMode === "list" ? "w-1/3" : "w-full aspect-square"}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <CardContent className="flex-grow p-4">
                          <Link href={`/shop/${item.id}`}>
                            <CardTitle className="text-lg font-semibold line-clamp-2 hover:underline text-black">
                              {item.name}
                            </CardTitle>
                          </Link>
                          <p className="text-2xl font-bold mt-2 text-black">
                            $ {item.price.toLocaleString()}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => addToCart(item)}
                            disabled={isLoading}
                            className="flex-1 mr-2 bg-yellow-600 text-white hover:bg-yellow-700"
                          >
                            {isLoading ? (
                              <Skeleton className="h-5 w-5 rounded-full" />
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeFromWishlist(item.id)}
                            disabled={isLoading}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            {isLoading ? (
                              <Skeleton className="h-5 w-5 rounded-full" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
        <Feature />
      </div>
    </>
  );
};

export default Wishlist;
