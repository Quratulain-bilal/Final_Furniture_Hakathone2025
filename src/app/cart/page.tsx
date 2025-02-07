"use client";
/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import shopheader from "../../../public/shopheader.png";
import { useCart } from "@/components/cart-context";
import Feature from "../../components/Feature"

export default function ShoppingCart() {
  // Get state and dispatch from the cart context
  const { state, dispatch } = useCart();

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  // Function to remove an item from the cart
  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <>
      {/* Hero Section with Background */}
      <div className="relative h-[200px] sm:h-[300px] w-full">
        <Image
          src={shopheader}
          alt="Shop Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <Image src="/brand.png" alt="logo" width={77} height={77} />
          <h1 className="text-2xl sm:text-5xl font-semibold text-black">
            Cart
          </h1>
          {/* Breadcrumb */}
          <div className="mt-2 sm:mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-28 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden">
              {/* Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 bg-amber-100 p-4">
                <div className="col-span-6 text-base font-medium">Product</div>
                <div className="col-span-2 text-base font-medium">Price</div>
                <div className="col-span-2 text-base font-medium">Quantity</div>
                <div className="col-span-2 text-base font-medium">Subtotal</div>
              </div>

              {/* Conditional rendering based on cart contents */}
              {state.items.length > 0 ? (
                // Render cart items
                state.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 p-4 items-center border-b"
                  >
                    <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-lg bg-[#FDF9F0] p-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <div className="col-span-12 sm:col-span-2">
                      <span className="text-gray-600">
                        $ {item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 text-center"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-2 flex items-center justify-between">
                      <span className="text-gray-600">
                        $ {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => removeItem(item.id)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Render empty cart message
                <div className="grid grid-cols-12 p-6 text-center text-gray-600">
                  <div className="col-span-12">
                    <p className="text-2xl font-bold">Your cart is empty.</p>
                    <p className="mt-4">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                      href="/shop"
                      className="mt-12 inline-block bg-black text-white px-10 py-6 rounded-lg hover:bg-[#3f3828]"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1">
            <div className=" bg-amber-100 rounded-lg p-10 py-20">
              <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base">Subtotal</span>
                  <span className="text-gray-600">
                    $ {state.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-[#B88E2F] text-xl">
                    $ {state.total.toLocaleString()}
                  </span>
                </div>
                {state.items.length > 0 && (
                  <Link href="/checkout">
                    <Button className="w-full bg-black hover:bg-black text-white rounded-lg py-3 mt-4">
                      Proceed to Checkout
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Feature />
    </>
  );
}
