"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeLink() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link href="/" className="hover:text-flash transition-colors">
      Home
    </Link>
  );
}
