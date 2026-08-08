import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { HomeLink } from "./HomeLink";

export function Nav() {
  return (
    <header className="w-full px-4 sm:px-6 md:px-10 py-4 md:py-6 flex items-center justify-between gap-3">
      <Link
        href="/"
        className="relative inline-flex items-center shrink-0 hover:opacity-80 transition-opacity"
      >
        <Image
          src="/logo-mark.png"
          alt="dypixels"
          width={48}
          height={48}
          className="h-[42px] w-[42px] sm:h-[50px] sm:w-[50px] dark:hidden"
          priority
        />
        <Image
          src="/logo-mark-dark.png"
          alt="dypixels"
          width={48}
          height={48}
          className="hidden dark:block h-10 w-10 sm:h-12 sm:w-12"
          priority
        />
      </Link>
      <nav className="flex items-center gap-3 sm:gap-5 md:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
        <HomeLink />
        <Link href="/#work" className="hover:text-flash transition-colors">
          Work
        </Link>
        <Link href="/about" className="hover:text-flash transition-colors">
          About
        </Link>
        <Link
          href="/#contact"
          className="docket px-2.5 sm:px-3 py-1.5 hover:text-flash transition-colors whitespace-nowrap"
        >
          Say hi
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
