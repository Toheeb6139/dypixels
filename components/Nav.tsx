import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <header className="w-full px-4 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between gap-3 relative z-20">
      <Link href="/" className="relative shrink-0 block" aria-label="dypixels home">
        <Image
          src="/logo-mark.png"
          alt="dypixels"
          width={44}
          height={44}
          className="w-9 h-9 sm:w-10 sm:h-10 object-contain object-top"
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
