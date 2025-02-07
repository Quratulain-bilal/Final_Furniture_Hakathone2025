"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCart } from "@/components/cart-context";
import { useState } from "react";

export default function CartSidebar() {
  const { state, dispatch } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const applyDiscount = () => {
    // Example logic for applying a discount
    if (discountCode === "SAVE10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <div className="flex flex-col h-full w-80 bg-white shadow-lg rounded-lg p-6">
      <DialogTitle asChild>
        <VisuallyHidden>Shopping Cart</VisuallyHidden>
      </DialogTitle>
      <h2 className="text-2xl font-bold mb-4 text-black">Your Cart</h2>
      <div className="flex-grow overflow-auto">
        {state.items.length > 0 ? (
          state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 pb-4 border-b border-gray-300"
            >
              <div className="relative h-32 w-32 rounded-lg bg-[#FDF9F0] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-black">{item.name}</h3>
                <p className="text-lg font-semibold text-black">
                  $ {item.price.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <Input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    onClick={() => removeItem(item.id)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5 text-black" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg font-medium text-black">
              Your cart is empty.
            </p>
            <p className="mt-2 text-gray-500">Add some items to your cart.</p>
            <Link href="/shop" className="mt-4">
              <Button className=" bg-yellow-500 hover:bg-[#A47E2F] text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Discount Code Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black">Discount Code</h3>
        <div className="flex items-center mt-2">
          <Input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Enter discount code"
            className="flex-grow border border-gray-300 rounded-md"
          />
          <Button
            onClick={applyDiscount}
            className="ml-2 bg-yellow-500 hover:bg-[#A47E2F] text-white"
          >
            Apply
          </Button>
        </div>
        {discountApplied && (
          <p className="mt-2 text-green-500">Discount applied!</p>
        )}
      </div>

      {/* Subtotal Section */}
      {state.items.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-medium text-black">Subtotal</span>
            <span className="text-lg font-bold text-black">
              $ {state.total.toLocaleString()}
            </span>
          </div>
          <Link href="/cart">
            <Button className="w-full bg-black text-white">View Cart</Button>
          </Link>
          <Link href="/checkout">
            <Button className="w-full bg-yellow-500 text-white mt-2">
              Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
