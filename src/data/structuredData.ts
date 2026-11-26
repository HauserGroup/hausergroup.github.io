import { groupEmail } from "./contact";
import { hauserOrcid, hauserScholar, profiles } from "./profiles";
import type { PublicationSection } from "./publications";
import { GROUP_PAGE } from "./site";

export type JsonLd = Record<string, unknown>;

export const SITE_NAME = "Hauser Group";
export const DEFAULT_DESCRIPTION =
  "The Hauser Group at the University of Copenhagen studies how human genetic variation changes the way G protein-coupled receptors (GPCRs) respond to drugs.";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const DEFAULT_OG_IMAGE_ALT =
  "Hauser Group · Pharmacoinformatics, Department of Drug Design and Pharmacology, University of Copenhagen";

export function organizationJsonLd(site: URL): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    "@id": new URL("/#organization", site).href,
    name: SITE_NAME,
    alternateName: ["Hauser Lab", "Hauser Group · Pharmacoinformatics"],
    url: new URL("/", site).href,
    logo: new URL("/favicon.svg", site).href,
    image: new URL(DEFAULT_OG_IMAGE, site).href,
    email: groupEmail,
    description: DEFAULT_DESCRIPTION,
    parentOrganization: {
      "@type": "Organization",
      name: "Department of Drug Design and Pharmacology",
      url: "https://drug.ku.dk/",
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "University of Copenhagen",
        url: "https://www.ku.dk/",
        sameAs: ["https://ror.org/035b05819"],
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Universitetsparken 2",
      postalCode: "2100",
      addressLocality: "Copenhagen",
      addressCountry: "DK",
    },
    founder: {
      "@type": "Person",
      "@id": new URL("/people/alexander-hauser/#person", site).href,
      name: "Alexander Sebastian Hauser",
    },
    sameAs: [
      GROUP_PAGE,
      "https://github.com/HauserGroup",
      hauserScholar,
      hauserOrcid,
    ],
  };
}

export function websiteJsonLd(site: URL): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": new URL("/#website", site).href,
    name: SITE_NAME,
    url: new URL("/", site).href,
    publisher: { "@id": new URL("/#organization", site).href },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  site: URL,
): JsonLd {
  const full =
    items[0]?.path === "/" ? items : [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site).href,
    })),
  };
}

export function personJsonLd(
  person: (typeof profiles)[number],
  site: URL,
): JsonLd {
  const sameAs: string[] = [];
  if (person.universityId) {
    sameAs.push(
      `https://researchprofiles.ku.dk/en/persons/${person.universityId}/`,
    );
  }
  if (person.orcid) sameAs.push(person.orcid);
  if (person.scholar) sameAs.push(person.scholar);
  if (person.linkedin) {
    sameAs.push(`https://www.linkedin.com/in/${person.linkedin}/`);
  }
  if (person.github) sameAs.push(`https://github.com/${person.github}`);

  const orgRef = {
    "@type": "ResearchOrganization",
    "@id": new URL("/#organization", site).href,
    name: "Hauser Group, University of Copenhagen",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": new URL(`/people/${person.slug}/#person`, site).href,
    name: person.name,
    familyName: person.familyName,
    jobTitle: person.title,
    url: new URL(`/people/${person.slug}/`, site).href,
    ...(person.portrait
      ? { image: new URL(person.portrait, site).href }
      : undefined),
    ...(person.alumni
      ? { alumniOf: orgRef }
      : { worksFor: orgRef, affiliation: orgRef }),
    ...(sameAs.length > 0 ? { sameAs } : undefined),
  };
}

export function softwareJsonLd(site: URL): JsonLd {
  const author = { "@id": new URL("/#organization", site).href };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hauser Group Software",
    url: new URL("/software/", site).href,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "CurveBook",
          url: "https://hausergroup.org/curvebook/",
          applicationCategory: "ScientificApplication",
          description:
            "Open-source biostatistics, nonlinear curve fitting and scientific graphing tool written in Rust.",
          programmingLanguage: "Rust",
          author,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareApplication",
          name: "scikit-opls",
          url: "https://hausergroup.org/scikit-opls/",
          applicationCategory: "ScientificApplication",
          softwareVersion: "0.2.0",
          description:
            "Open-source Python implementation of OPLS, OPLS-DA and O2PLS with a scikit-learn interface, VIP scores, S-plots and permutation tests.",
          programmingLanguage: "Python",
          author,
        },
      },
    ],
  };
}

export function publicationsJsonLd(
  sections: PublicationSection[],
  site: URL,
): JsonLd {
  const papers = sections.flatMap((section) => section.papers);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Publications · Hauser Group",
    url: new URL("/publications/", site).href,
    isPartOf: { "@id": new URL("/#website", site).href },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: papers.length,
      itemListElement: papers.map((paper, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          headline: paper.title,
          datePublished: paper.publishedOn ?? paper.year,
          url: `https://doi.org/${paper.doi}`,
          sameAs: `https://doi.org/${paper.doi}`,
          isPartOf: {
            "@type": "Periodical",
            name: paper.journal,
          },
        },
      })),
    },
  };
}
