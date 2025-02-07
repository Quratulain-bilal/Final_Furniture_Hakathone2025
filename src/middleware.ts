import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(['/shop(.*)', '/cart(.*)', '/checkout(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user is not authenticated and tries to access a protected route, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Apply middleware to all routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
