import type { Primary } from "./site";
import { emailLink } from "./contact";

export const hauserScholar =
  "https://scholar.google.dk/citations?user=LWy0R1EAAAAJ&hl=en";
export const hauserOrcid = "https://orcid.org/0000-0003-1098-6419";

const roleOrder = {
  "Associate Professor, group leader": 0,
  Postdoc: 1,
  "PhD Fellow": 2,
  "Research Assistant / PhD Fellow": 2,
  "Master’s student": 3,
  "Former group member": 4,
} as const;

interface Member {
  slug: string;
  name: string;
  familyName: string;
  title: keyof typeof roleOrder;
  color: Primary;
  alumni?: boolean;
  portrait?: boolean;
  universityId?: string;
  linkedin?: string;
  scholar?: string;
  github?: string;
  orcid?: string;
  email?: string;
}

const members: Member[] = [
  {
    slug: "alexander-hauser",
    github: "AlexanderHauser",
    name: "Alexander Sebastian Hauser",
    familyName: "Hauser",
    title: "Associate Professor, group leader",
    color: "b",
    portrait: true,
    universityId: "alexander-sebastian-hauser",
    linkedin: "alexshauser",
    scholar: hauserScholar,
    orcid: hauserOrcid,
  },
  {
    slug: "marin-matic",
    portrait: true,
    linkedin: "marin-matic-7401329a",
    orcid: "https://orcid.org/0000-0003-1449-8797",
    github: "maticmarin",
    name: "Marin Matic",
    familyName: "Matic",
    title: "Postdoc",
    color: "g",
    universityId: "marin-matic",
    email: "marin.matic@sund.ku.dk",
  },
  {
    slug: "olav-larsen",
    portrait: true,
    linkedin: "olav-larsen-989024280",
    orcid: "https://orcid.org/0000-0001-9054-4690",
    name: "Olav Larsen",
    familyName: "Larsen",
    title: "Postdoc",
    color: "r",
    universityId: "olav-larsen",
    email: "olavl@sund.ku.dk",
  },
  {
    slug: "luuk-hoegen-dijkhof",
    orcid: "https://orcid.org/0009-0007-6928-0513",
    github: "luukhd2",
    name: "Luuk Robin Hoegen Dijkhof",
    familyName: "Hoegen Dijkhof",
    title: "Research Assistant / PhD Fellow",
    color: "r",
    portrait: true,
    universityId: "luuk-robin-hoegen-dijkhof",
    linkedin: "luuk-hoegen-dijkhof-170337181",
  },
  {
    slug: "teemu-ronkko",
    orcid: "https://orcid.org/0000-0003-4865-4815",
    github: "teemuronkko",
    name: "Teemu Kalle Eemeli Rönkkö",
    familyName: "Rönkkö",
    title: "Research Assistant / PhD Fellow",
    color: "b",
    portrait: true,
    universityId: "pqh443-pqh443",
    linkedin: "ronkkoteemu",
  },
  {
    slug: "jakob-madsen",
    linkedin: "jakob-madsen",
    name: "Jakob Sture Madsen",
    familyName: "Madsen",
    title: "PhD Fellow",
    color: "y",
    portrait: true,
    universityId: "jakob-sture-madsen",
    orcid: "https://orcid.org/0000-0002-2841-7284",
  },
  {
    slug: "alexander-pedersen",
    portrait: true,
    linkedin: "alexanderpedersen1999",
    orcid: "https://orcid.org/0009-0004-3793-4242",
    name: "Alexander Peder Smiszek Pedersen",
    familyName: "Pedersen",
    universityId: "alexander-peder-smiszek-pedersen",
    title: "PhD Fellow",
    color: "g",
  },
  {
    slug: "mariana-ribeiro",
    portrait: true,
    name: "Mariana Louro Ribeiro",
    familyName: "Ribeiro",
    universityId: "mariana-louro-ribeiro",
    linkedin: "marianalouroribeiro",
    title: "PhD Fellow",
    color: "r",
  },
  {
    slug: "pablo-baceiredo-macho",
    portrait: true,
    orcid: "https://orcid.org/0009-0004-3481-5256",
    github: "pablobaceiredo",
    name: "Pablo Baceiredo Macho",
    familyName: "Baceiredo Macho",
    title: "PhD Fellow",
    color: "y",
    universityId: "pablo-baceiredo-macho",
    email: "pablo.baceiredo@sund.ku.dk",
    linkedin: "pablo-baceiredo-macho",
  },
  {
    slug: "luis-herfurth",
    portrait: true,
    linkedin: "luis-herfurth-3b698923a",
    orcid: "https://orcid.org/0009-0000-9933-3056",
    github: "luisherfurth",
    name: "Luis Herfurth",
    familyName: "Herfurth",
    title: "Master’s student",
    color: "g",
    email: "luis.herfurth@sund.ku.dk",
  },
  {
    slug: "david-reiner-link",
    orcid: "https://orcid.org/0000-0003-1514-2215",
    name: "David Reiner-Link",
    familyName: "Reiner-Link",
    title: "Former group member",
    color: "g",
    alumni: true,
    portrait: true,
    universityId: "david-reiner-link",
    linkedin: "david-reiner-link",
  },
];

const names = new Intl.Collator("en", { sensitivity: "base" });
const orderedMembers = members.toSorted(
  (a, b) =>
    roleOrder[a.title] - roleOrder[b.title] ||
    names.compare(a.familyName, b.familyName) ||
    names.compare(a.name, b.name),
);

export const profiles = orderedMembers.map((member) => {
  const university = member.universityId
    ? `https://researchprofiles.ku.dk/en/persons/${member.universityId}/`
    : undefined;
  const links: { label: string; href: string }[] = [];
  if (member.email)
    links.push({ label: member.email, href: "mailto:" + member.email });
  if (university)
    links.push(
      { label: "Contact at UCPH", href: university },
      { label: "Publications", href: university + "publications/" },
    );
  if (member.scholar)
    links.push({ label: "Google Scholar", href: member.scholar });
  if (member.orcid) links.push({ label: "ORCID", href: member.orcid });
  if (member.linkedin)
    links.push({
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/" + member.linkedin + "/",
    });
  if (member.github)
    links.push({
      label: "GitHub",
      href: "https://github.com/" + member.github,
    });
  if (!links.length)
    links.push({
      label: "Contact the group",
      href: emailLink("Enquiry for " + member.name),
    });
  const words = member.name.split(" ");
  return {
    ...member,
    initials: words[0][0] + words[words.length - 1][0],
    portrait: member.portrait ? `/people/${member.slug}.jpg` : undefined,
    links,
  };
});
