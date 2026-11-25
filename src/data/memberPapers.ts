import { publications, type Publication } from "./publications";

// Additional journal records from Europe PMC, matched by author ID or full name and affiliation.
type MemberPaper = Pick<
  Publication,
  "doi" | "title" | "journal" | "year" | "publishedOn" | "memberSlugs"
>;
const additionalPapers: MemberPaper[] = [
  {
    doi: "10.1038/s41467-026-68479-0",
    title:
      "Structural basis for selective inhibition of human GABA transporter GAT3",
    journal: "Nat Commun",
    year: "2026",
    publishedOn: "2026-01-29",
    memberSlugs: ["alexander-pedersen"],
  },
  {
    doi: "10.1016/j.biopha.2024.117454",
    title:
      "Histamine H3 receptor antagonist/nitric oxide donors as novel promising therapeutic hybrid-tools for glaucoma and retinal neuroprotection",
    journal: "Biomed Pharmacother",
    year: "2024",
    publishedOn: "2024-09-24",
    memberSlugs: ["david-reiner-link"],
  },
  {
    doi: "10.1080/10408363.2024.2358304",
    title: "G protein-coupled receptor (GPCR) pharmacogenomics",
    journal: "Crit Rev Clin Lab Sci",
    year: "2024",
    publishedOn: "2024-08-09",
    memberSlugs: ["david-reiner-link"],
  },
  {
    doi: "10.1080/14756366.2023.2175821",
    title:
      "Novel benzothiazole derivatives as multitargeted-directed ligands for the treatment of Alzheimer's disease",
    journal: "J Enzyme Inhib Med Chem",
    year: "2023",
    publishedOn: "2023-12-01",
    memberSlugs: ["david-reiner-link"],
  },
  {
    doi: "10.1021/acs.jmedchem.3c00430",
    title:
      "Dual Piperidine-Based Histamine H3 and Sigma-1 Receptor Ligands in the Treatment of Nociceptive and Neuropathic Pain",
    journal: "J Med Chem",
    year: "2023",
    publishedOn: "2023-07-07",
    memberSlugs: ["david-reiner-link"],
  },
  {
    doi: "10.1186/s13059-026-04104-z",
    title:
      "scArchon: a scalable benchmarking framework for assessing single-cell perturbation models",
    journal: "Genome Biol",
    year: "2026",
    publishedOn: "2026-05-12",
    memberSlugs: ["luis-herfurth"],
  },
  {
    doi: "10.1007/978-1-0716-4828-5_18",
    title:
      "Exploring the Functional Consequences of Protein-Coding Alternative Splice Variants at a Genome Scale: A Guide to Utilizing EXPANSION",
    journal: "Methods Mol Biol",
    year: "2026",
    publishedOn: "2026-01-01",
    memberSlugs: ["marin-matic"],
  },
  {
    doi: "10.1016/j.xgen.2024.100557",
    title: "The landscape of cancer-rewired GPCR signaling axes",
    journal: "Cell Genom",
    year: "2024",
    publishedOn: "2024-05-01",
    memberSlugs: ["marin-matic"],
  },
  {
    doi: "10.1093/bioadv/vbad135",
    title:
      "EXPANSION: a webserver to explore the functional consequences of protein-coding alternative splice variants in cancer genomics",
    journal: "Bioinform Adv",
    year: "2023",
    publishedOn: "2023-09-26",
    memberSlugs: ["marin-matic"],
  },
  {
    doi: "10.1038/s41467-023-40045-y",
    title:
      "GPCRome-wide analysis of G-protein-coupling diversity using a computational biology approach",
    journal: "Nat Commun",
    year: "2023",
    publishedOn: "2023-07-19",
    memberSlugs: ["marin-matic"],
  },
  {
    doi: "10.1002/1873-3468.14778",
    title:
      "Chemokine N-terminal-derived peptides differentially regulate signaling by the receptors CCR1 and CCR5",
    journal: "FEBS Lett",
    year: "2023",
    publishedOn: "2023-12-06",
    memberSlugs: ["olav-larsen"],
  },
  {
    doi: "10.1016/j.isci.2023.108416",
    title: "GPR162 is a beta cell CART receptor",
    journal: "iScience",
    year: "2023",
    publishedOn: "2023-11-10",
    memberSlugs: ["olav-larsen"],
  },
  {
    doi: "10.1126/scisignal.abg7042",
    title:
      "Identification of a conserved chemokine receptor motif that enables ligand discrimination",
    journal: "Sci Signal",
    year: "2022",
    publishedOn: "2022-03-08",
    memberSlugs: ["olav-larsen"],
  },
  {
    doi: "10.1016/j.nbd.2026.107454",
    title:
      "Analysis of the involvement of RNA-binding proteins in TAU-dependent neurodegeneration",
    journal: "Neurobiol Dis",
    year: "2026",
    publishedOn: "2026-05-20",
    memberSlugs: ["pablo-baceiredo-macho"],
  },
  {
    doi: "10.1016/j.ekir.2023.11.020",
    title:
      "Randomized Trial of SGLT2 Inhibitor Identifies Target Proteins in Diabetic Kidney Disease",
    journal: "Kidney Int Rep",
    year: "2024",
    publishedOn: "2023-11-29",
    memberSlugs: ["teemu-ronkko"],
  },
  {
    doi: "10.2337/dc22-1157",
    title:
      "Dapagliflozin Improves the Urinary Proteomic Kidney-Risk Classifier CKD273 in Type 2 Diabetes with Albuminuria: A Randomized Clinical Trial",
    journal: "Diabetes Care",
    year: "2022",
    publishedOn: "2022-11-01",
    memberSlugs: ["teemu-ronkko"],
  },
];

export function recentPapersFor(slug: string) {
  return [
    ...publications.filter((paper) => !paper.preprint),
    ...additionalPapers,
  ]
    .filter((paper) => paper.memberSlugs.includes(slug))
    .sort((a, b) =>
      (b.publishedOn ?? b.year).localeCompare(a.publishedOn ?? a.year),
    )
    .slice(0, 5);
}
