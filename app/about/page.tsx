import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";

export default function About() {
  return (
    <>
      <Nav />

      <section className="px-6 md:px-10 py-12 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-6">
          The person behind the tag
        </p>

        <h1 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.02] mb-6">
          I'm Toheeb — dypixels is just what I call it when I'm working.
        </h1>

        <a
          href="/Toheeb-Adeyemi-Resume.pdf"
          download
          className="docket inline-flex items-center gap-2 px-3 py-1.5 mb-12 font-mono text-[11px] uppercase tracking-wider hover:text-flash transition-colors"
        >
          Download résumé ↓
        </a>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 font-body text-lg leading-relaxed text-ink/85 space-y-6 max-w-xl">
            <p>
              I'm finishing a degree in Electronic and Computer Engineering
              at Lagos State University — the kind of course that teaches
              you to care about signal, noise, and whether a thing actually
              works before you worry about whether it looks good. Design
              pulled me in from the side around 2022, and it turned out the
              two habits agree with each other more than I expected.
            </p>
            <p>
              Most of what I do now sits at brand identity and
              concept-driven campaign work — logo through launch, not just
              a nice picture in isolation. Two things I actually trust
              about my own work: I can hold a visual system together
              across dozens of live assets without it drifting (proven
              through months running the entire visual campaign for RARK,
              a Ramadan charity — greetings, fundraiser trackers, program
              posts, all staying on-brand through an active fundraiser),
              and I can land a single idea fast, evidenced by a set of
              concept ads for brands like Colgate, Spotify, and Starlink,
              each built around one sharp visual pun rather than a full
              system. One exercise in that second mode — a Halloween
              reimagining of Levi's — ended up winning the Deestinct
              Halloween Rebrand Challenge in 2025.
            </p>
            <p>
              I work fast, mostly solo, and I like projects with a real
              constraint to design around — a budget, a deadline, a brand
              voice that's already half-formed and just needs sharpening.
              Outside client work, I lead design for DesigNation, an
              X-based design community, and previously took a self-founded
              product (DYDX Liquid Soap) through the full arc — strategy,
              packaging, launch. I also lean on AI-assisted tools alongside
              Photoshop, Illustrator, and Figma to move faster from concept
              to execution. If you've got a brand that needs an outfit,
              that's exactly the kind of thing I enjoy taking on.
            </p>
          </div>

          <div className="font-mono text-sm space-y-8">
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
                Elsewhere
              </p>
              <SocialLinks compact />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
