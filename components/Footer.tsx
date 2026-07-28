import { SpecModeToggle } from "./SpecMode";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full px-6 md:px-10 py-16 mt-24 border-t border-line"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mute mb-3">
            Currently — open for work
          </p>
          <h2 className="font-display text-3xl md:text-5xl max-w-lg leading-[1.05]">
            Got a brand that needs an outfit?
          </h2>
        </div>

        <SocialLinks />
      </div>

      <div className="flex items-center justify-between mt-16 flex-wrap gap-4">
        <p className="font-mono text-[11px] text-mute">
          dypixels — Lagos, NG. © {new Date().getFullYear()}. Built by hand, not by template.
        </p>
        <SpecModeToggle />
      </div>
    </footer>
  );
}
