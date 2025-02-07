import { loadStripe, type Stripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
     const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error("Stripe publishable key is not set. Please check your environment variables.")
    }
    console.log("Initializing Stripe with key:", publishableKey.substring(0, 8) + "...")
    stripePromise = loadStripe(publishableKey).catch((error) => {
      console.error("Error loading Stripe:", error)
      return null
    })
  }
  return stripePromise
}

