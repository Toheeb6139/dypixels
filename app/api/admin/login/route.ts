import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, hashSecret } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { error: "Admin login isn't configured yet. Set ADMIN_PASSWORD and SESSION_SECRET." },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, hashSecret(process.env.SESSION_SECRET), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
