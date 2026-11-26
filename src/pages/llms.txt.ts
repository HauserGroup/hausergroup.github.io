import type { APIRoute } from "astro";
import { groupEmail } from "../data/contact";
import { profiles } from "../data/profiles";
import { publicationSections } from "../data/publications";
import { GROUP_PAGE, joinOptions, scales } from "../data/site";
import { DEFAULT_DESCRIPTION } from "../data/structuredData";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://hausergroup.org");
  const url = (path: string) => new URL(path, origin).href;

  const currentMembers = profiles.filter((p) => !p.alumni);
  const alumni = profiles.filter((p) => p.alumni);

  const formatPerson = (p: (typeof profiles)[number]) => {
    const orcid = p.orcid ? ` · ORCID: ${p.orcid}` : "";
    return `- [${p.name}](${url(`/people/${p.slug}/`)}) — ${p.title}${orcid}`;
  };

  const lines: string[] = [
    "# Hauser Group",
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    "The Hauser Group (Pharmacoinformatics) is led by Associate Professor Alexander Sebastian Hauser at the Department of Drug Design and Pharmacology, University of Copenhagen (Universitetsparken 2, 2100 Copenhagen, Denmark).",
    "",
    "## Research scales",
    "",
    ...scales.map((s) => `- **${s.name}:** ${s.text} ${s.example}`),
    "",
    "## Key pages",
    "",
    `- [Home](${url("/")}) — Overview, research scales, recent papers, software and team`,
    `- [About](${url("/about/")}) — Mission and four-scale research approach`,
    `- [Publications](${url("/publications/")}) — Peer-reviewed papers and preprints with DOIs`,
    `- [Software](${url("/software/")}) — Open-source tools (CurveBook, scikit-opls)`,
    `- [People](${url("/people/")}) — Current researchers, fellows and students`,
    `- [Alumni](${url("/alumni/")}) — Former group members`,
    `- [Work with us](${url("/opportunities/")}) — PhD, postdoc, MSc thesis, visiting and collaboration enquiries`,
    `- [Services](${url("/services/")}) — Analysis software and research collaboration enquiries`,
    `- [News](${url("/news/")}) — Grants, fellowships and group highlights`,
    `- [Contact](${url("/contact/")}) — Copenhagen address and contact details`,
    "",
    "## Open-source software",
    "",
    "- [CurveBook](https://hausergroup.org/curvebook/) — Open-source Rust tool for biostatistics, nonlinear curve fitting and scientific graphs.",
    "- [scikit-opls](https://hausergroup.org/scikit-opls/) — Open-source Python library for OPLS, OPLS-DA and O2PLS with a scikit-learn interface.",
    "",
    "## Current members",
    "",
    ...currentMembers.map(formatPerson),
    "",
  ];

  if (alumni.length > 0) {
    lines.push("## Alumni", "", ...alumni.map(formatPerson), "");
  }

  lines.push("## Selected publications", "");
  for (const section of publicationSections) {
    lines.push(`### ${section.title}`, "");
    for (const paper of section.papers) {
      const preprintTag = paper.preprint ? " [preprint]" : "";
      lines.push(
        `- ${paper.year} · ${paper.journal}${preprintTag}: [${paper.title}](https://doi.org/${paper.doi})`,
      );
    }
    lines.push("");
  }

  lines.push(
    "## Opportunities",
    "",
    ...joinOptions.map((o) => `- **${o.title}:** ${o.short}`),
    "",
    "## Contact & external links",
    "",
    `- Email: ${groupEmail}`,
    `- Address: Department of Drug Design and Pharmacology, University of Copenhagen, Universitetsparken 2, 2100 Copenhagen, Denmark`,
    `- Official UCPH group page: ${GROUP_PAGE}`,
    "- GitHub organization: https://github.com/HauserGroup",
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
