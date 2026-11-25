// Content that changes most often lives here, so updating the site rarely
// means touching markup. Colors are one of the four primaries:
// "b" blue, "r" red, "y" yellow, "g" green.

export type Primary = "b" | "r" | "y" | "g";

export const GROUP_PAGE =
  "https://drug.ku.dk/research-sections/pharmaceutical-informatics/pharmacoinformatics/";

export const scales = [
  {
    id: "01 in_silico",
    color: "b",
    text: "Predict how mutations change drug response.",
    tools: "models · structures",
  },
  {
    id: "02 in_vitro",
    color: "r",
    text: "Measure how variants change drug response in cells.",
    tools: "assays · cell lines",
  },
  {
    id: "03 in_human",
    color: "y",
    text: "Link variants to disease and changes in therapy.",
    tools: "biobanks · registries",
  },
  {
    id: "04 in_field",
    color: "g",
    text: "Build a public platform that phenotypes GPCR variants.",
    tools: "open data",
  },
] satisfies { id: string; color: Primary; text: string; tools: string }[];

export const scaleNames = ["in silico", "in vitro", "in human", "in field"];

export const research = [
  {
    title: "Pharmacogenomics And Personalised Medicine",
    text: "Linking missense variants in GPCRs to drug response and to patient cohorts, so a prescription can follow a genotype.",
    color: "y",
    icon: "variant",
    modelQuestion:
      "Which receptor variants change a drug response enough to investigate in cells or in patient data?",
    reach: ["in silico", "in vitro", "in human", "in field"],
  },
  {
    title: "Peptide–Receptor Pairs Across The Domains Of Life",
    text: "Venom, plant and microbial peptides act on receptors in other species. We use co-evolution and structure prediction to find them on purpose.",
    color: "g",
    icon: "peptide",
    modelQuestion:
      "Which peptide and receptor pairs are likely to bind, and which predictions should we test first?",
    reach: ["in silico", "in vitro"],
  },
  {
    title: "Molecular Pharmacology Of GPCRs",
    text: "Assays for binding, selectivity and signalling that show how human variants change the action of approved drugs.",
    color: "r",
    icon: "signalling",
    modelQuestion:
      "Can a binding or signalling measurement help predict which pathway a ligand activates?",
    reach: ["in vitro"],
  },
] satisfies {
  title: string;
  text: string;
  color: Primary;
  icon: "variant" | "peptide" | "signalling";
  modelQuestion: string;
  reach: string[];
}[];
