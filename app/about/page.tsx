import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "About — dypixels",
  description:
    "Toheeb, a.k.a dypixels — a Lagos-based brand and visual identity designer. Engineering background, design-first practice.",
};

export default function About() {
  return (
    <>
      <Nav />

      <section className="px-6 md:px-10 py-12 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-6">
          Who's behind this?
        </p>

        <h1
          className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.02] mb-6"
        >
          Behind <span className="text-flash font-extrabold">dypixels</span> is
          just me. Hi, I'm Toheeb.
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
            className="md:col-span-2 font-body text-base leading-snug text-ink/85 space-y-4 max-w-xl"
          >
            <p>
              I'm finishing a degree in Electronic and Computer Engineering
              at Lagos State University. It's the kind of course that
              teaches you to care whether something actually works before
              worrying about whether it looks good. Design found me in
              2022, and the two have been getting along ever since.
            </p>
            <p>
              Most of my work lives at the intersection of brand identity,
              campaign design, and visual systems. I enjoy turning rough
              ideas into clear identities, and building creative systems
              that stay consistent long after launch. Whether it's a logo,
              a campaign, or a social rollout, I'm usually thinking about
              the bigger picture.
            </p>
            <p>
              These days, I lead design at DesigNation while working with
              brands on identity and campaign projects. My toolkit leans
              on Photoshop, Illustrator, Figma, and AI where it makes
              sense. The goal is never to design more. It's to design
              better.
            </p>
          </div>

          <div
            className="font-mono text-sm space-y-8"
          >
            <div>
              <p className="text-mute uppercase tracking-wider text-xs mb-2">
                Based in
              </p>
              <p>Lagos, Nigeria</p>
            </div>
            <div>
              <p className="text-mute uppercase tracking-wider text-xs mb-2">
                Focus
              </p>
              <p>Brand Identity, Visual Systems, Concept-led Campaigns</p>
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
          className="mt-20 md:mt-28 pt-12 border-t border-line"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-mute mb-3">
            Have a project in mind?
          </p>
          <h2 className="font-display text-2xl md:text-4xl mb-8 max-w-xl">
            Tell me what you're working on.
          </h2>
          <ContactForm />
          <p className="font-mono text-[11px] text-mute mt-4 max-w-md">
            Your details are only used to reply to you — never shared,
            sold, or used for anything else.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
