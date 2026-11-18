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

- **One primary per view.** A section gets one colored field with one cut-paper
  object on it. The receptor drawing and the four scale windows are the only
  places where all four appear together, because they show the whole system.
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
| Headings     | Inter Tight   | 500     | Title Case, tracking −0.045em, line height ≈ 0.9 |
| Body         | Inter Tight   | 400     | 17 px, line height 1.55                          |
| Data, chrome | IBM Plex Mono | 400–600 | Windows, residue labels, facts, axis labels      |

- Headings are big and medium weight, never bold. Size comes from `clamp()` so
  they scale with the viewport.
- Section headings use Title Case. Body text and captions use sentence case.
- Captions are 13 px in `--ink-2`. The one caption under the hero is red.

## Components

**Halftone field (`.dots`)**: a pale tint with a 10 px grid of dots in the
primary, fading out toward the top. Used for the hero, research tiles, software
tiles, people portraits and closing panels.

**Window (`.win`)**: white body, 1.5 px ink border, 3 px hard ink shadow, a
title bar with a close box and striped lines. Holds short facts and asides
(mission, 34%, join). The four scale windows replace the stripes with a solid
primary title bar and their shape.

**Button (`.btn`)**: a brick. Solid primary fill, 1.5 px ink border, 3 px hard
ink shadow. On press it moves 3 px down and right and the shadow disappears, so
it seats like a brick clicking into place. Blue is the default; `.btn.y` is
yellow with ink text; `.btn.lg` is the larger size for software calls to
action. External links end in `↗`.

**Cut-paper object (`.tile .obj`)**: one flat shape in the primary, with a
4 × 6 px hard shadow. Shapes used so far: half disc, leaf, circle.

**Residue bricks (`.res`)**: monospaced amino-acid letters in outlined boxes
with Ballesteros–Weinstein numbers below. The variant is red, lifted and
rotated.

## Layout and spacing

- Content width up to 1320 px, with a side gutter of at least 20 px.
- Sections are separated by generous space (140 px, 96 px on phones) rather
  than rules or boxes.
- Section heads are a two-column grid: big heading left, a short line of text
  right, aligned to the bottom.
- Corners are square. No rounded cards, no soft drop shadows.
- Grids collapse to two columns below 1000 px and one below 640 px.

## Content rules

- **People**: names and titles only. No phone numbers or email addresses on this
  site; people are reached through the
  [department's group page](https://drug.ku.dk/research-sections/pharmaceutical-informatics/pharmacoinformatics/),
  which is linked from the header and the join panel. Portraits are initials on
  a halftone field until we decide on photos.
- **The residue row is illustrative**, and the page says so. It is not a claim
  about a specific receptor variant.
- **The 34% figure** (share of approved drugs acting on a GPCR) comes from
  Hauser et al., _Nature Reviews Drug Discovery_, 2017.
- Keep copy plain and short: what the work is and why it matters, in a sentence
  or two per item.

## Where to change things

| To change…                | Edit                            |
| ------------------------- | ------------------------------- |
| People, research, scales  | `src/data/site.ts`              |
| Colors, type, spacing     | `src/styles/site.css` (`:root`) |
| Header, footer, page head | `src/layouts/Base.astro`        |
| Sections and software     | `src/pages/index.astro`         |
| Logo or receptor drawing  | `src/components/`               |

## Open questions

- **Fonts are loaded from Google Fonts**, which sends visitors' IP addresses to
  Google. Self-hosting them (for example with Fontsource) would avoid that.
- Photos instead of initials for people.
- A publications section.
