import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// MyAccount Component: This component represents the "My Account" page of the application.
function MyAccount() {
  return (
    <>
      {/* Hero Section with Background */}
      {/* This section displays a hero image with a background overlay, a logo, page title, and breadcrumb navigation */}
      <div className="relative h-[300px] w-full">
        <Image
          src="/shopheader.png" // Header background image
          alt="Shop Header"
          fill
          className="object-cover"
          priority // Ensures the image is loaded quickly as it's important for the page
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Black overlay for better text visibility */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <Image src="/brand.png" alt="logo" width={77} height={77} />
          <h1 className="text-4xl font-bold text-black">My Account</h1>
          {/* Breadcrumb Navigation */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/checkout" className="hover:underline">
              My account
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {/* This section contains the Login and Register forms */}
      <div className="mt-8 grid gap-8 mx-4 lg:mx-32 lg:grid-cols-2">
        {/* Login Section */}
        {/* This section contains the Login form for users to log in to their accounts */}
        <div className="p-4 rounded">
          <h2 className="text-3xl font-bold my-8">Log In</h2>
          <div className="flex flex-col">
            {/* Username Input */}
            <div className="flex flex-col">
              <label className="my-2 font-semibold text-gray-800 mb-2" htmlFor="username">
                Username or email address
              </label>
              <input
                type="text"
                id="username"
                className="w-full sm:w-[300px] my-2 border border-gray-400 rounded p-2 mb-4"
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col">
              <label className="my-2 font-semibold text-gray-800 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full sm:w-[300px] my-2 border border-gray-400 rounded p-2 mb-4"
              />
            </div>
            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-800 my-4">
                Remember me
              </label>
            </div>
            {/* Login Button and Password Recovery */}
            <div className="flex items-center">
              <button className="border border-black font-medium text-black px-10 py-3 rounded-xl hover:text-white hover:bg-gray-700">
                Log In
              </button>
              <p className="ml-6 text-gray-500 text-sm hover:underline cursor-pointer">
                Lost Your Password?
              </p>
            </div>
          </div>
        </div>

        {/* Register Section */}
        {/* This section contains the Register form for users to create new accounts */}
        <div className="p-4 rounded">
          <h2 className="text-3xl font-bold my-8">Register</h2>
          {/* Email Address Input */}
          <label className="block my-2 font-semibold text-gray-800 mb-2" htmlFor="register-email">
            Email address
          </label>
          <input
            type="text"
            id="register-email"
            className="w-full sm:w-[300px] my-2 border border-gray-400 rounded p-2 mb-4"
          />
          {/* Registration Information */}
          <p className="text-gray-500 my-4">
            A link to set a new password will be sent to your email address.
          </p>
          <p className="text-gray-500 mb-4">
            Your personal data will be used to support your experience throughout this
            website, to manage access to your account, and for other purposes described
            in our <Link href='/' className="font-bold text-gray-700">privacy policy</Link>.
          </p>
          {/* Register Button */}
          <button className="border my-10 border-black font-medium text-black px-10 py-3 rounded-xl hover:text-white hover:bg-gray-700">
            Register
          </button>
        </div>
      </div>

      {/* Features Section */}
      {/* Highlights the website's key features, such as free delivery, returns, and secure payment */}
      <div className="bg-[#FDF7FC] px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature: Free Delivery */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">
              For all orders over $50, consectetur adipiscing elit.
            </p>
          </div>
          {/* Feature: 90 Days Return */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">90 Days Return</h3>
            <p className="text-sm text-muted-foreground">
              If goods have problems, consectetur adipiscing elit.
            </p>
          </div>
          {/* Feature: Secure Payment */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure payment, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
