import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/components/ContactForm";

export default function About() {
  return (
    <>
      <Nav />

      <section className="px-6 md:px-10 py-12 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-6">
          The person behind the tag
        </p>

        <h1
          className="spec-mark font-display text-4xl md:text-6xl max-w-3xl leading-[1.02] mb-6"
          data-spec-label="H1"
        >
          I'm Toheeb — <span className="text-flash font-extrabold">dypixels</span> is
          just what I call it when I'm working.
        </h1>

        <a
          href="/Toheeb-Adeyemi-Resume.pdf"
          download
          className="docket inline-flex items-center gap-2 px-3 py-1.5 mb-12 font-mono text-[11px] uppercase tracking-wider hover:text-flash transition-colors"
        >
          Download résumé ↓
        </a>

        <div className="grid md:grid-cols-3 gap-12">
          <div
            className="spec-mark md:col-span-2 font-body text-base leading-snug text-ink/85 space-y-4 max-w-xl"
            data-spec-label="BIO"
          >
            <p>
              I'm finishing a degree in Electronic and Computer Engineering
              at Lagos State University. It's the kind of course that
              teaches you to care whether a thing actually works before
              you worry about whether it looks good. Design pulled me in
              around 2022, and the two habits agree more than I expected.
            </p>
            <p>
              Most of my work sits in brand identity and concept-driven
              campaigns, logo through launch. I can hold a visual system
              together at scale (RARK's Ramadan campaign ran for months
              without drifting off-brand), and I can land a single sharp
              idea fast (concept ads for brands like Colgate and
              Starlink). One of those ideas, a Halloween reimagining of
              Levi's, won the Deestinct Halloween Rebrand Challenge in 2025.
            </p>
            <p>
              I work fast, mostly solo, and currently lead design for
              DesigNation alongside client work. I lean on AI-assisted
              tools with Photoshop, Illustrator, and Figma. Got a brand
              that needs an outfit? I'd love to help.
            </p>
          </div>

          <div
            className="spec-mark font-mono text-sm space-y-8"
            data-spec-label="META"
          >
            <div>
              <p className="text-mute uppercase tracking-wider text-xs mb-2">
                Based in
              </p>
              <p>Epe, Lagos State</p>
            </div>
            <div>
              <p className="text-mute uppercase tracking-wider text-xs mb-2">
                Focus
              </p>
              <p>Brand identity, campaign &amp; concept advertising, social systems</p>
            </div>
            <div>
              <p className="text-mute uppercase tracking-wider text-xs mb-2">
                Recognition
              </p>
              <p>Winner, Deestinct Halloween Rebrand Challenge (2025)</p>
            </div>
            <div>
              <p className="text-mute uppercase tracking-wider text-xs mb-2">
                Reach me directly
              </p>
              <SocialLinks compact only={["Email", "WhatsApp"]} />
            </div>
          </div>
        </div>

        <div
          className="spec-mark mt-20 md:mt-28 pt-12 border-t border-line"
          data-spec-label="LEAD FORM"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-mute mb-3">
            Have a project in mind?
          </p>
          <h2 className="font-display text-2xl md:text-4xl mb-8 max-w-xl">
            Tell me what you're working on.
          </h2>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
