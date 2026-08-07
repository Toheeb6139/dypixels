import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full px-6 md:px-10 py-16 mt-24 bg-flash text-cream"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cream/70 mb-3">
            Available for select projects
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl max-w-lg leading-[1.05]">
            Good ideas deserve good <span className="text-spark">branding.</span>
          </h2>
        </div>

        <div>
          <SocialLinks inverted />
        </div>
      </div>

      <div className="flex items-center justify-center mt-16">
        <p className="font-mono text-[11px] text-cream/60 text-center">
          dypixels • Nigeria • ©{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
