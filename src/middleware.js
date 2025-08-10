import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If there's a token, the user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
