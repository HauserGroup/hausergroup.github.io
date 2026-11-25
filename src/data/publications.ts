export interface Publication {
  year: string;
  journal: string;
  title: string;
  doi: string;
  authors: string;
  memberSlugs: string[];
  credit?: string;
  note?: string;
  /** Verified first-online date. Omitted when only the citation year was checked. */
  publishedOn?: string;
  preprint?: boolean;
  sourceUrl?: string;
}

export interface PublicationSection {
  id: string;
  title: string;
  papers: Publication[];
}

// Curated 25 November 2026 against KU author records and publisher/PubMed records.
// Years follow the journal citation; online-first differences are stated below.
// Primary checks: researchprofiles.ku.dk/en/persons/{author}/ and each linked DOI.
export const publicationSections: PublicationSection[] = [
  {
    id: "recent",
    title: "Recent group papers",
    papers: [
      {
        year: "2026",
        journal: "British Journal of Pharmacology",
        title:
          "Systematic profiling reveals broad G protein coupling and context-dependent modulation of cyclic AMP by the orphan receptor GPR139",
        doi: "10.1111/bph.70606",
        publishedOn: "2026-08-20",
        memberSlugs: ["alexander-hauser"],
        authors: "Trapkov B, Bräuner H & Hauser AS.",
        credit: "Alexander Hauser · corresponding author",
      },
      {
        year: "2025",
        journal: "Briefings in Bioinformatics",
        title:
          "Deep learning in GPCR drug discovery: benchmarking the path to accurate peptide binding",
        doi: "10.1093/bib/bbaf186",
        publishedOn: "2025-03-01",
        memberSlugs: [
          "luuk-hoegen-dijkhof",
          "teemu-ronkko",
          "alexander-hauser",
        ],
        authors:
          "Hoegen Dijkhof LR, Rönkkö TKE, von Vegesack HC, Lenzing J & Hauser AS.",
        credit:
          "Luuk Hoegen Dijkhof & Teemu Rönkkö · joint first authors; Alexander Hauser · corresponding author",
      },
      {
        year: "2025",
        journal: "British Journal of Pharmacology",
        title:
          "Differential G protein activation by the long and short isoforms of the dopamine D2 receptor",
        doi: "10.1111/bph.16388",
        publishedOn: "2024-05-09",
        memberSlugs: ["david-reiner-link", "jakob-madsen", "alexander-hauser"],
        authors:
          "Reiner-Link D, Madsen JS, Gloriam DE, Bräuner-Osborne H & Hauser AS.",
        credit:
          "Jakob Sture Madsen, Alexander Hauser & David Reiner-Link (alumnus)",
        note: "Online first in 2024; journal issue published in 2025.",
      },
      {
        year: "2025",
        journal: "Nucleic Acids Research",
        title:
          "PGxDB: an interactive web-platform for pharmacogenomics research",
        doi: "10.1093/nar/gkae1127",
        publishedOn: "2025-01-01",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Nguyen TTD, Tanoli Z, Hassan S, Özcan UO, Caroli J, Kooistra AJ, Gloriam DE & Hauser AS.",
        credit: "Alexander Hauser",
        note: "Online first in 2024; 2025 Database Issue.",
      },
    ],
  },
  {
    id: "collaborations",
    title: "Recent collaborations",
    papers: [
      {
        year: "2026",
        journal: "Food Chemistry",
        title: "Sweet proteins designed with increased thermostability",
        doi: "10.1016/j.foodchem.2026.151969",
        publishedOn: "2026-11-06",
        memberSlugs: ["teemu-ronkko", "alexander-hauser"],
        authors:
          "Ramos-Viana V, Rönkkö TKE, Bidart GN, Divine R, Welner DH, Hauser AS, Baker D, Jahn LJ, Sommer MOA.",
        credit: "Teemu Rönkkö & Alexander Hauser",
        sourceUrl: "https://europepmc.org/article/MED/43003026",
      },
      {
        year: "2026",
        journal: "bioRxiv",
        title:
          "De novo macrocyclic peptide discovery produces potent class A GPCR ligands with diverse pharmacology",
        doi: "10.64898/2026.10.21.760615",
        publishedOn: "2026-10-22",
        memberSlugs: ["marin-matic", "alexander-hauser"],
        authors:
          "Salgado-Polo F, Matic M, Rainsford PB, Faas F, Meyrath M, Regmi R, Rosenkilde MM, Szpakowska M, Chevigné A, Hauser AS, Rogers JM, Gustavsson M.",
        credit: "Marin Matic & Alexander Hauser",
        sourceUrl: "https://europepmc.org/article/PPR/PPR1348466",
        preprint: true,
      },
      {
        year: "2026",
        journal: "iScience",
        title:
          "Non-canonical cleavage of GPR125/ADGRA3 releases extracellular receptor fragments detectable in cerebrospinal fluid",
        doi: "10.1016/j.isci.2026.117551",
        publishedOn: "2026-09-21",
        memberSlugs: ["olav-larsen"],
        authors: "Walser ALS, Larsen O, Stüdle C et al.",
        credit: "Olav Larsen · member’s collaborative work",
        sourceUrl: "https://europepmc.org/article/MED/42827708",
      },
      {
        year: "2026",
        journal: "bioRxiv",
        title:
          "PrimeKG-Plus: a refreshed and rare-disease-enriched precision medicine knowledge graph",
        doi: "10.64898/2026.07.14.738415",
        publishedOn: "2026-07-18",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Nguyen TTD, Nguyen-Phuong T, Nguyen Q, Abbasi AM, Le Phan H, Nguyen LB, Phan N, Curabaz NN, Hauser AS, Tanoli Z, Nguyen DT, Kooistra AJ.",
        credit: "Alexander Hauser",
        sourceUrl: "https://europepmc.org/article/PPR/PPR1281346",
        preprint: true,
      },
      {
        year: "2026",
        journal: "British Journal of Pharmacology",
        title:
          "Drugs that act on both G protein-coupled receptors (GPCRs) and kinases: potentiation of effects, side effects and general aspects of drug pleiotropy",
        doi: "10.1111/bph.70481",
        publishedOn: "2026-05-10",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Ljunggren H, Sokolov A, Ballante F, Fredriksson R, Lagunas-Rangel F, Hauser AS, Knapp S, Jonsson J, Schiöth HB.",
        credit: "Alexander Hauser",
        sourceUrl: "https://europepmc.org/article/MED/42108658",
      },
      {
        year: "2026",
        journal: "Cell Stem Cell",
        title:
          "Cardiopedia-Ligand: A ligand-receptor perturbation atlas of human cardiac organoid function and transcriptional state",
        doi: "10.1016/j.stem.2026.07.004",
        publishedOn: "2026-07-28",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Reid JD, Foster SR, Lor M, Hauser AS, Griffen B, Fitzsimmons RL & Hudson JE.",
        credit: "Alexander Hauser",
      },
      {
        year: "2026",
        journal: "Nature Reviews Methods Primers",
        title: "Peptide ligand discovery of G protein-coupled receptors",
        doi: "10.1038/s43586-026-00503-5",
        publishedOn: "2026-07-16",
        memberSlugs: ["marin-matic", "alexander-hauser"],
        authors: "Hermes J, Matic M, Yeung HY et al.",
        credit: "Marin Matic & Alexander Hauser",
      },
      {
        year: "2026",
        journal: "Cell Chemical Biology",
        title:
          "GLP-1R and GIPR crosstalk modulates insulinotropic signaling pathways",
        doi: "10.1016/j.chembiol.2026.06.003",
        publishedOn: "2026-07-08",
        memberSlugs: ["luuk-hoegen-dijkhof", "alexander-hauser"],
        authors: "Lindquist P, Hoegen Dijkhof LR, Drzazga AK et al.",
        credit: "Luuk Hoegen Dijkhof & Alexander Hauser",
      },
      {
        year: "2026",
        journal: "Metabolism",
        title:
          "Global glucagon-like peptide-2 receptor activation linked to increased obesity risk in the UK Biobank",
        doi: "10.1016/j.metabol.2025.156489",
        publishedOn: "2026-01-08",
        memberSlugs: ["jakob-madsen", "alexander-hauser"],
        authors:
          "Gerlach PA, Gadgaard S, Madsen JS, Lindquist P, Lorente JS, Faas F, Gabe MBN, Rosenkilde MM & Hauser AS.",
        credit: "Jakob Sture Madsen & Alexander Hauser",
      },
      {
        year: "2026",
        journal: "Nature Communications",
        title:
          "Ultra-large virtual screening unveils potent agonists of the neuromodulatory orphan receptor GPR139",
        doi: "10.1038/s41467-025-66845-y",
        publishedOn: "2025-12-09",
        memberSlugs: ["alexander-hauser"],
        authors: "Cabeza de Vaca I, Trapkov B, Shen L et al.",
        credit: "Alexander Hauser",
        note: "Published online 9 December 2025; cited as Nature Communications 17, 129 (2026).",
      },
      {
        year: "2025",
        journal: "Neuron",
        title:
          "The polypharmacology of psychedelics reveals multiple targets for potential therapeutics",
        doi: "10.1016/j.neuron.2025.06.012",
        publishedOn: "2025-07-18",
        memberSlugs: ["jakob-madsen", "alexander-hauser"],
        authors: "Jain MK, Gumpper RH, Slocum ST et al.",
        credit: "Jakob Sture Madsen & Alexander Hauser",
      },
      {
        year: "2025",
        journal: "British Journal of Pharmacology",
        title: "Progress on the development of Class A GPCR-biased ligands",
        doi: "10.1111/bph.17301",
        publishedOn: "2024-09-11",
        memberSlugs: ["olav-larsen"],
        authors: "Morales P, Scharf MM, Bermudez M et al.",
        credit: "Olav Larsen · member’s collaborative work",
        note: "Online first in 2024; journal issue published in 2025.",
      },
      {
        year: "2025",
        journal: "Nature Reviews Drug Discovery",
        title: "GPCR drug discovery: new agents, targets and indications",
        doi: "10.1038/s41573-025-01139-y",
        publishedOn: "2025-03-03",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Sánchez Lorente J, Sokolov AV, Ferguson G, Schiöth HB, Hauser AS & Gloriam DE.",
        credit: "Alexander Hauser",
      },
      {
        year: "2024",
        journal: "Nature Metabolism",
        title:
          "Characterization of genetic variants of GIPR reveals a contribution of β-arrestin to metabolic phenotypes",
        doi: "10.1038/s42255-024-01061-4",
        publishedOn: "2024-06-13",
        memberSlugs: ["jakob-madsen", "alexander-hauser"],
        authors: "Kizilkaya HS, Sørensen KV, Madsen JS et al.",
        credit: "Jakob Sture Madsen & Alexander Hauser",
      },
    ],
  },
  {
    id: "landmarks",
    title: "Selected landmark papers",
    papers: [
      {
        year: "2022",
        journal: "eLife",
        title: "Common coupling map advances GPCR–G protein selectivity",
        doi: "10.7554/eLife.74107",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Hauser AS, Avet C, Normand C, Mancini A, Inoue A, Bouvier M & Gloriam DE.",
      },
      {
        year: "2022",
        journal: "Cell Chemical Biology",
        title:
          "Ligand-directed bias of G protein signaling at the dopamine D2 receptor",
        doi: "10.1016/j.chembiol.2021.07.004",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Von Moo E, Harpsøe K, Hauser AS, Masuho I, Bräuner-Osborne H, Gloriam DE & Martemyanov KA.",
      },
      {
        year: "2021",
        journal: "Nature Structural & Molecular Biology",
        title:
          "GPCR activation mechanisms across classes and macro/microscales",
        doi: "10.1038/s41594-021-00674-7",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Hauser AS, Kooistra AJ, Munk C, Heydenreich FM, Veprintsev DB, Bouvier M, Babu MM & Gloriam DE.",
      },
      {
        year: "2019",
        journal: "Cell",
        title:
          "Discovery of human signaling systems: pairing peptides to G protein-coupled receptors",
        doi: "10.1016/j.cell.2019.10.010",
        memberSlugs: ["alexander-hauser"],
        authors: "Foster SR, Hauser AS, Vedel L et al.",
      },
      {
        year: "2018",
        journal: "Cell",
        title: "Pharmacogenomics of GPCR drug targets",
        doi: "10.1016/j.cell.2017.11.033",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Hauser AS, Chavali S, Masuho I, Jahn LJ, Martemyanov KA, Gloriam DE & Babu MM.",
      },
      {
        year: "2017",
        journal: "Nature Reviews Drug Discovery",
        title:
          "Trends in GPCR drug discovery: new agents, targets and indications",
        doi: "10.1038/nrd.2017.178",
        memberSlugs: ["alexander-hauser"],
        authors:
          "Hauser AS, Attwood MM, Rask-Andersen M, Schiöth HB & Gloriam DE.",
      },
      {
        year: "2017",
        journal: "Nature",
        title: "Selectivity determinants of GPCR–G-protein binding",
        doi: "10.1038/nature22070",
        memberSlugs: ["alexander-hauser"],
        authors: "Flock T, Hauser AS, Lund N, Gloriam DE, Balaji S & Babu MM.",
      },
    ],
  },
];

export const publications = publicationSections.flatMap(
  (section) => section.papers,
);

// Sort the curated recent selection by verified first-online publication date.
// The homepage lists journal papers. Preprints are labelled in the archive.
export const latestPapers = publicationSections
  .filter((section) => section.id !== "landmarks")
  .flatMap((section) => section.papers)
  .filter((paper) => !paper.preprint)
  .sort((a, b) =>
    (b.publishedOn ?? b.year).localeCompare(a.publishedOn ?? a.year),
  )
  .slice(0, 5);
