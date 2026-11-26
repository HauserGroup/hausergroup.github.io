// Content that changes most often lives here, so updating the site rarely
// means touching markup. Colors are one of the four primaries:
// "b" blue, "r" red, "y" yellow, "g" green.

import { emailLink } from "./contact";

export type Primary = "b" | "r" | "y" | "g";

// A short statement from the group leader, shown on a sheet of paper under the
// hero. Leave `text` empty until Alex has written it: an empty statement shows
// a marked draft in `npm run dev` and nothing on the published site.
export const statement = {
  text: "",
  author: "Alexander Sebastian Hauser",
  role: "Group leader",
};

// Ways to join or work with the group. Used on the homepage and /opportunities.
export const joinOptions = [
  {
    title: "Current positions",
    short: "PhD and postdoc positions on the UCPH job portal.",
    body: "Find advertised PhD and postdoctoral positions on the University of Copenhagen job portal. Each listing has its own deadline and application form.",
    label: "Browse UCPH vacancies",
    href: "https://employment.ku.dk/all-vacancies/",
    color: "b",
  },
  {
    title: "Visit the lab",
    short: "Spend a research period with us in Copenhagen.",
    body: "Interested in spending a research period abroad in Copenhagen? Tell us where you study or work, your preferred dates and the question you would like to explore.",
    label: "Enquire about a visit",
    href: emailLink("Research visit in Copenhagen"),
    color: "g",
  },
  {
    title: "Thesis projects",
    short: "MSc and exchange projects, computational or experimental.",
    body: "Get in touch about an MSc or exchange project in computational biology or experimental pharmacology. Include your programme and the methods you would like to learn.",
    label: "Discuss a thesis project",
    href: emailLink("Thesis or exchange project"),
    color: "y",
  },
  {
    title: "Collaborate",
    short: "A dataset, assay or model that overlaps with our work.",
    body: "Have a dataset, assay or modelling question that overlaps with our work? Send a short description of the project and what you would like to do together.",
    label: "Start a collaboration",
    href: emailLink("Research collaboration"),
    color: "r",
  },
] satisfies {
  title: string;
  short: string;
  body: string;
  label: string;
  href: string;
  color: Primary;
}[];

export const GROUP_PAGE =
  "https://drug.ku.dk/research-sections/pharmaceutical-informatics/pharmacoinformatics/";

// The four scales a receptor variant is followed through, from residue to
// patient. `example` names concrete work at that scale.
export const scales = [
  {
    name: "in silico",
    color: "b",
    text: "Predict how a variant changes drug response.",
    example:
      "Structure prediction and co-evolution, also to find peptide–receptor pairs across species.",
  },
  {
    name: "in vitro",
    color: "r",
    text: "Measure that change in cells.",
    example: "Binding, selectivity and signalling assays with approved drugs.",
  },
  {
    name: "in human",
    color: "y",
    text: "Link variants to disease and to changes in therapy.",
    example: "Missense variants in UK Biobank and the Danish registries.",
  },
  {
    name: "in field",
    color: "g",
    text: "Make it a shared resource for personalised medicine.",
    example: "A public platform that phenotypes GPCR variants.",
  },
] satisfies { name: string; color: Primary; text: string; example: string }[];
