# Design choices

How the Hauser Group website looks and why. Read this before changing styles or
adding a section. The code that carries these choices lives in
`src/styles/site.css` (tokens and components), `src/data/site.ts` (content),
and `src/components/` (logo and receptor drawing).

## The idea

Four primary colors, paper and building bricks, applied to receptor
pharmacology.

- **Four primaries** like a box of construction paper or building bricks. Each
  one also names one of the four scales of the group's work, so color always
  means something.
- **Paper**: shapes are cut out and lie on the page with a short, hard shadow.
  Nothing is glossy, blurred or floating.
- **Bricks**: halftone dot fields read as studs. Amino-acid residues are drawn
  as bricks, and a variant is a brick swapped out of the row.
- **Receptor**: the seven transmembrane helices of a GPCR are the hero image and
  the logo (seven tilted bars).

The calm, white, one-color-at-a-time treatment was inspired by
[Fuzzco](https://fuzzco.com/) and the
[TypeSafe launch site](https://www.framer.com/stories/typesafe/): big Title
Case type, lots of white space, halftone fields and small retro software
windows.

## Whimsy, in small doses

Calm is the base, but a page with only straight, pale boxes feels like a
template. A few hand-placed paper moments keep it playful. Use only these, and
only where listed:

- **Post-it** (`.sticker`): the yellow 34% note stuck on the corner of the
  receptor animation.
- **The statement sheet**: a flat white sheet laid across the bottom of the hero.
- **Tilted backing paper**: each portrait is pasted on a sheet of its person's
  color, slightly askew; it straightens on hover.
- **The lifted brick**: the swapped residue in the research section.
- **Matching cut edges** (`.cut-bottom`, `.cut-top`): the blue hero's bottom
  edge and the yellow "Work With Us" sheet's top edge are cut with the same
  uneven line, so the page opens and closes on matching paper.

Headings stay plain: no colored highlights behind words. A full-strength red
block in the headline was too loud.

Tilts stay between 1° and 6°. Nothing animates except the receptor and the
button press.

**One material.** Everything is flat cut paper: solid color or white, square
corners, a short hard shadow. No realistic textures, ruled lines, rubber
stamps or curled corners, and no mixing in other materials. When adding
something new, build it from the same parts rather than inventing a new look.

## How the homepage tells the story

- **Tell it on the page.** The homepage carries the whole story (what we study,
  how, what we have published, what we build, who we are, how to join), so
  readers don't need to click through. Avoid "see more" or "all …" links where
  the homepage can show the thing itself; the header nav covers the subpages.
- **Few captions.** Don't label things that explain themselves. No eyebrows over
  headings, no "open source · Rust" lines over names, no notes under drawings.
  A short tag (`.facts`) is fine when it carries information.
- **Order**: hero → statement → research → latest papers → software → people →
  work with us.
- **Short header.** The logo, four links (Research, Publications, People, Join
  us) and the UCPH button. Every other page is linked from the footer.

## Color

| Token      | Hex       | Scale     | Shape    | Use                                    |
| ---------- | --------- | --------- | -------- | -------------------------------------- |
| `--blue`   | `#1E4FC2` | in silico | square   | Default buttons, hero field, links     |
| `--red`    | `#D92D1C` | in vitro  | circle   | The swapped residue, the 34% figure    |
| `--yellow` | `#F6C51B` | in human  | triangle | Fills only, always with ink text       |
| `--green`  | `#178553` | in field  | diamond  | Fills and shapes                       |
| `--ink`    | `#17171A` | –         | –        | Text, outlines, window chrome, shadows |
| `--ink-2`  | `#6A6A70` | –         | –        | Secondary text and captions            |
| `--bg`     | `#FBFBF9` | –         | –        | Page background                        |
| `--white`  | `#FFFFFF` | –         | –        | Window bodies and the research band    |

Each primary has a pale tint (`--blue-t`, `--red-t`, `--yellow-t`, `--green-t`)
used as the ground of a halftone field. The classes `.b`, `.r`, `.y` and `.g`
set both `--c` (the primary) and `--t` (its tint) on any element.

Rules:

- **One primary per view.** A section gets one colored field or sheet. The
  receptor, the four scales and the people's backing sheets are the places
  where all four appear together, because they show the whole system.
- **Color is meaning, not status.** Never use red for errors or green for
  success. Red is the in vitro scale and the variant; it is not a warning.
- **Yellow is never text on white** (1.6:1 contrast). Use it as a fill with ink
  text on top. Large initials on a yellow tint use the darker `--yellow-text`.
- **Never encode with color alone.** Each scale also has a shape and a name.
- White text works on blue, red and green (all above 4.5:1).
- Light theme only, by choice. The paper metaphor depends on a light page.

## Type

| Role         | Face          | Weight  | Notes                                            |
| ------------ | ------------- | ------- | ------------------------------------------------ |
| Headings     | Geologica     | 450     | Title Case, tracking −0.045em, line height ≈ 0.9 |
| Wordmark     | Geologica     | 500–600 | Header logo text and the `34%` sticker           |
| Body         | Inter Tight   | 400     | 17 px, line height 1.55                          |
| Data, chrome | IBM Plex Mono | 400–600 | Windows, residue labels, facts, axis labels      |

- Headings are big and medium weight, never bold. Size comes from `clamp()` so
  they scale with the viewport.
- Section headings use Title Case. Body text and captions use sentence case.
- Captions are 13 px in `--ink-2`, and rare (see "Few captions").
- Geologica runs at Sharpness 100, which turns curve joins into hard corners to
  echo the cut paper. It also sets paper titles on `/publications/`. It covers
  Greek, so titles with `β`, `µ` or `κ` stay in one face; check Greek coverage
  before swapping in any other heading font.

## Components

**Halftone field (`.dots`)**: a pale tint with a 10 px grid of dots in the
primary, fading out toward the top. In the hero it fades downward instead, so
the dots sit behind the animation and the text below stays clean. Used for the
hero, software icons and closing panels.

**Hero**: the particle receptor sits directly on the halftone field, with no
frame around it, inside a soft circular glow that fades out before the edge
of its box. Nothing floats over it except the post-it.

**Statement** (`src/components/Statement.astro`): the group leader's words on a
flat white sheet with the standard cut-paper shadow, tilted 1°, overlapping
the bottom of the hero. The text lives in `statement` in `src/data/site.ts`
and must be Alex's own words. While it is empty, a marked draft shows in
`npm run dev` (or a build with `PUBLIC_SHOW_DRAFTS=1`) and nothing appears on
the published site.

**From One Residue To One Patient** (`src/components/Scales.astro`): the
research section, on the homepage (`/#research`) and on /about. The residue
bricks show a
variant; below them, the four scales in four columns under a 2 px ink rule.
Each column is the scale's shape in full color, its name, what we do at that
scale, and one concrete example in grey. The examples carry what used to be
the separate "lines of work" (peptide–receptor pairs, assays, biobanks and
registries, the variant platform). The text lives in `scales` in
`src/data/site.ts`.

**Software** (`.tool`): two compact entries side by side under a 2 px ink
rule, like the scales and the join list. Each is a small halftone icon, the
name, one sentence, a couple of tags and a button. No boxes.

**Button (`.btn`)**: a brick. Solid primary fill, 1.5 px ink border, 3 px hard
ink shadow. On press it moves 3 px down and right and the shadow disappears, so
it seats like a brick clicking into place. Blue is the default; `.btn.y` is
yellow with ink text. External links end in `↗`.

**Residue bricks (`.res`)**: monospaced amino-acid letters in outlined boxes
with Ballesteros–Weinstein numbers below. The variant is red, lifted and
rotated. No caption: they name no receptor, so they make no claim.

## Layout and spacing

- Content width up to 1320 px, with a side gutter of at least 20 px.
- Sections are separated by generous space (140 px, 96 px on phones) rather
  than rules or boxes.
- Section heads are a two-column grid: big heading left, a short line of text
  right, aligned to the bottom.
- Corners are square. No rounded cards, no soft drop shadows.
- Grids collapse to two columns below 1000 px and one below 640 px.

## Content rules

- **People**: names, titles and photos only. No phone numbers or email
  addresses in the people section. The "Work With Us" options link to the job
  portal and to email enquiries with a subject line.
- **The residue row is illustrative.** It names no receptor, so it makes no
  claim about a specific variant, and it carries no caption.
- **The statement is Alex's own words.** Never publish placeholder or drafted
  text under his name.
- **The 34% figure** (share of approved drugs acting on a GPCR) comes from
  Hauser et al., _Nature Reviews Drug Discovery_, 2017.
- Keep copy plain and short: what the work is and why it matters, in a sentence
  or two per item.

## Where to change things

| To change…                | Edit                            |
| ------------------------- | ------------------------------- |
| Scales, join, statement   | `src/data/site.ts`              |
| People                    | `src/data/profiles.ts`          |
| Colors, type, spacing     | `src/styles/site.css` (`:root`) |
| Header, footer, page head | `src/layouts/Base.astro`        |
| Sections and software     | `src/pages/index.astro`         |
| Logo or receptor drawing  | `src/components/`               |

## Open questions

- **Fonts are loaded from Google Fonts**, which sends visitors' IP addresses to
  Google. Self-hosting them (for example with Fontsource) would avoid that.
- Alex's statement: wording, and whether to add a scanned signature.
