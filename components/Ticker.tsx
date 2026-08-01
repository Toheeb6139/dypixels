const TICKER_TEXT =
  "BRAND IDENTITY  ·  CAMPAIGN DESIGN  ·  SOCIAL SYSTEMS  ·  LAGOS, NG  ·  OPEN FOR WORK  ·  ";

export function Ticker() {
  const repeated = TICKER_TEXT.repeat(4);

  return (
    <div className="w-full overflow-hidden bg-flash py-3 mb-10 md:mb-16">
      <div className="ticker-track">
        <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-cream whitespace-nowrap pr-4">
          {repeated}
        </span>
        {/* duplicate copy, hidden from screen readers, makes the loop seamless */}
        <span
          aria-hidden="true"
          className="font-mono text-xs md:text-sm uppercase tracking-widest text-cream whitespace-nowrap pr-4"
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
