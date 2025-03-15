import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/login", "/register"]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  //  Redirect unauthenticated users to the sign-in page
  if (!authObject.userId) {
    return authObject.redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
