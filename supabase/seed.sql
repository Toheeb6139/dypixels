-- Optional: run after schema.sql if you want to start from the same
-- placeholder projects that show up before Supabase is connected,
-- instead of starting from an empty table. Edit freely, or skip this
-- and just use /admin to add your real projects from scratch.

insert into projects (slug, title, client, type, year, summary, description, featured, sort_order, published)
values
  ('koma-kitchen', 'Koma Kitchen', 'Koma Kitchen', 'Brand Identity', 2025,
   'A full brand system for a kitchen concept that needed to feel warm, precise, and unmistakably its own.',
   'Full identity system for Koma Kitchen — naming support, wordmark, visual language, and application across packaging, social, and space.',
   true, 0, false),
  ('rark-ramadan-campaign', 'RARK', 'Ramadan Acts of Random Kindness', 'Brand Identity / Campaign System', 2026,
   'A full visual system, held together across dozens of live assets, through one charity''s entire Ramadan season.',
   'Two logo directions developed with written rationale, followed by a full live campaign: greetings, fundraiser trackers, program explainers, and gratitude posts — staying visually consistent across a live, fast-moving campaign.',
   false, 1, false),
  ('ten-brand-spec-ads', 'Ten brands, ten ideas', 'Self-initiated', 'Concept Advertising', 2026,
   'Spec ads for Colgate, Spotify, Starlink, Grok, Dangote, and five more — one sharp visual idea each, minimal copy.',
   'A set of concept advertisements for ten established brands, each built around a single visual metaphor or pun rather than product photography.',
   true, 2, false),
  ('levis-spooky-rebrand', 'Levi''s, spooky rebrand', 'Levi''s (concept)', 'Concept / Award-winning', 2025,
   'Winner, Deestinct Halloween Rebrand Challenge (2025).',
   'A concept rebrand exploring how a legacy brand''s system flexes for a seasonal moment without breaking it — selected as the winning entry in the Deestinct Halloween Rebrand Challenge.',
   true, 3, false),
  ('mike-sports-apparel', 'mike.', 'mike.', 'Brand Identity', 2025,
   'A sports apparel brand that needed to look fast standing still.',
   'Full identity system for mike. — wordmark, kit graphics, and social templates built to hold up on a jersey and a phone screen equally well.',
   true, 4, false),
  ('five-stages-of-grief', '5 Stages of Grief', 'Personal', 'Editorial / Visual Exploration', 2025,
   'A visual language for something nobody wants to design for.',
   'A personal, non-commercial series translating each stage of grief into its own colour, mark, and mood — sequential visual storytelling.',
   true, 5, false),
  ('loomi-travels-social', 'Loomi Travels', 'Loomi Travels', 'Social Media Design', 2025,
   'A travel brand''s feed, tightened into something worth stopping for.',
   'A social system for Loomi Travels — a grid of templates flexible enough for daily posting without ever looking like a template.',
   true, 6, false)
on conflict (slug) do nothing;

-- Rows are inserted as published = false on purpose — flip each to
-- true from /admin once you've swapped in real images and copy.
