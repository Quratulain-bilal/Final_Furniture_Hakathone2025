import { NextResponse } from "next/server"
import Stripe from "stripe"
import type { CartItem } from "@/app/types/checkout"

// Remove initialization from top level
export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 })
  }

  try {
    // Initialize Stripe inside the handler
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia" as const,
    })

    const body = await req.json()
    const { items } = body as { items: CartItem[] }

    if (!items?.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error in checkout route:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

