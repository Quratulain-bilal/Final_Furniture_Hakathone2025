"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react"; // Changed icon import
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-context";
import Image from "../../app/success/Image"
import Feature from "../../components/Feature"

export default function SuccessPage() {
  const router = useRouter();
  const { dispatch } = useCart();

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  return (
    <>
      <Image />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg text-center animate-fade-in">
          {" "}
          {/* Increased max-w-md to max-w-lg */}
          <CheckCircle className="w-20 h-20 text-yellow-600 mx-auto mb-4" />{" "}
          {/* Changed icon */}
          <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8 text-2xl">
            Thank you for your purchase! Your order has been confirmed and is
            being processed. You will receive an email shortly with the details
            of your order and tracking information. We appreciate your business
            and hope to see you again soon!
          </p>
          <Button
            onClick={() => router.push("/shipping")}
            className="w-full bg-yellow-600"
          >
            Track Order
          </Button>
        </div>
      </div>
      <Feature />
    </>
  );
}
