"use client"

import Link from "next/link";
import { Heart, Menu, ShoppingCart, User, CreditCard } from "lucide-react"; // Added CreditCard icon
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/components/wishlist-context";
import Image from "next/image";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function NavBar() {
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  const { isSignedIn = false, user } = useUser();

  return (
    <nav
      className={`px-4 py-4 w-full transition-all duration-300 bg-amber-100
     
      `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/brand.png" alt="logo" width={60} height={60} />{" "}
            {/* Increased logo size */}
          </Link>
          {/* Center Section (Navigation Links) */}
          <ul className="hidden md:flex items-center gap-10">
            <NavLinks />
          </ul>
          {/* Right Section (Icons) */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <NavIcons
              cartItemCount={cartState.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
              wishlistItemCount={wishlistState.items.length}
              isSignedIn={isSignedIn}
              user={user}
            />
            {/* Checkout Icon */}
            <Link href="/checkout">
              <button className="p-1 sm:p-2 relative">
                <CreditCard className="h-8 w-8" /> {/* Checkout icon */}
                <span className="sr-only">Checkout</span>
              </button>
            </Link>
            {/* Hamburger Menu - Visible only on mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2">
                  <Menu className="h-8 w-8" /> {/* Increased icon size */}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle>
                  <VisuallyHidden>Mobile Menu</VisuallyHidden>
                </SheetTitle>
                <div className="pt-4 pb-2 space-y-2">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block py-2 text-lg font-medium text-black hover:text-primary transition-colors"
    : "text-lg font-medium text-black hover:text-primary transition-colors"; // Increased text size
  return (
    <>
      <li className="list-none">
        <Link href="/" className={linkClass}>
          Home
        </Link>
      </li>
      <li className="list-none">
        <Link href="/shop" className={linkClass}>
          Shop
        </Link>
      </li>
      <li className="list-none">
        <Link href="/Blogpage" className={linkClass}>
          Blog
        </Link>
      </li>
      <li className="list-none">
        <Link href="/contact" className={linkClass}>
          Contact
        </Link>
      </li>
      <li className="list-none">
        <Link href="/About" className={linkClass}>
          About



        </Link>
      </li>
    </>
  );
}

interface NavIconsProps {
  cartItemCount: number;
  wishlistItemCount: number;
  isSignedIn: boolean;
  user:
    | {
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
      }
    | null
    | undefined; // Allow `undefined` for the user object
}

function NavIcons({
  cartItemCount,
  wishlistItemCount,
  isSignedIn,
  user,
}: NavIconsProps) {
  return (
    <>
      {isSignedIn ? (
        <div className="flex items-center space-x-3">
          <UserButton afterSignOutUrl="/" />
          <span className="text-base font-medium">
            {user?.firstName || user?.lastName
              ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
              : "User"}
          </span>
        </div>
      ) : (
        <SignInButton mode="redirect">
          <button className="p-1 sm:p-2 flex items-center space-x-2">
            <User className="h-8 w-8" /> {/* Increased icon size */}
            <span className="text-base font-medium">Login</span>
          </button>
        </SignInButton>
      )}
      <Link href="/wishlist">
        <button className="p-1 sm:p-2 relative">
          <Heart className="h-8 w-8" /> {/* Increased icon size */}
          {wishlistItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {wishlistItemCount}
            </span>
          )}
          <span className="sr-only">Wishlist</span>
        </button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-1 sm:p-2 relative">
            <ShoppingCart className="h-8 w-8" /> {/* Increased icon size */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetTitle>
            <VisuallyHidden>Cart</VisuallyHidden>
          </SheetTitle>
          <CartSidebar />
        </SheetContent>
      </Sheet>
    </>
  );
}
