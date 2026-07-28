import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, hashSecret } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expected = process.env.SESSION_SECRET
    ? hashSecret(process.env.SESSION_SECRET)
    : null;

  if (!session || !expected || session !== expected) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
