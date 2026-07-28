import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <header className="w-full px-4 sm:px-6 md:px-10 py-5 md:py-6 flex items-center justify-between gap-3">
      <Link
        href="/"
        className="spec-mark inline-flex items-center shrink-0 hover:opacity-80 transition-opacity"
        data-spec-label="LOGOMARK"
      >
        <Image
          src="/logo-mark.png"
          alt="dypixels"
          width={48}
          height={48}
          className="h-10 w-10 sm:h-12 sm:w-12"
          priority
        />
      </Link>
      <nav className="flex items-center gap-3 sm:gap-5 md:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
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
      </nav>
    </header>
  );
}
