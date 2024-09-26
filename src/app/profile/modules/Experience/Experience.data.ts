import type { Employer, Job, YearOfJobs } from "./Experience.types";

const ublo: Employer = {
  name: "Ublo.immo",
  url: "https://ublo.immo",
};

const wolfox: Employer = {
  name: "Wolfox",
  url: "https://wolfox.co",
};

const freelance: Employer = {
  name: "Freelance",
};

const wecheers: Employer = {
  name: "WeCheers",
  url: "https://wecheers.fr",
};

const ironhack: Employer = {
  name: "Ironhack",
  url: "https://www.ironhack.com",
};

export const allJobs: Job[] = [
  {
    employer: ublo,
    title: "Lead front-end engineer",
    year: 24,
    current: true,
    description:
      "Leading a team of 4 front-end engineers, working with product & design teams to bring the best to our users.",
  },
  {
    employer: ublo,
    title: "Design System Engineer",
    year: 24,
    description:
      "In charge of overhauling whole ui stack targeting multiple platforms and devices, creating new and improving existing components.",
  },
  {
    employer: ublo,
    title: "UX/UI Designer",
    year: 24,
    description:
      "Audited current product state & features. researched & implemented ux improvements.",
  },
  {
    employer: ublo,
    title: "Front End Engineer",
    year: 23,
    description:
      "Integration & development of new features in a b2b environment.",
  },
  {
    employer: freelance,
    title: "Product Designer",
    year: 22,
    current: true,
    description:
      "collaborated with various companies and individuals to create stuff.",
  },
  {
    employer: wolfox,
    title: "UX/UI Designer",
    year: 22,
    description:
      "Worked with clients on their UX/UI design projects, in collaboration with the team.",
  },
  {
    employer: wecheers,
    title: "Lead Front-End Engineer",
    year: 21,
    description:
      "Managed a 6 person team, developed a cross-platorm application mvp, added polish, set up ci/cd workflows and publishing.",
  },
  {
    employer: wolfox,
    title: "Full Stack Engineer",
    year: 20,
    description:
      "collaborate with agency clients, bringing their projects to reality.",
  },
  {
    employer: ironhack,
    title: "Part-Time Teacher",
    year: 19,
    description:
      "Taught web development fundamentals to ux/ui design students.",
  },
  {
    employer: freelance,
    title: "Creative Developer",
    year: 19,
    current: true,
    description:
      "worked with a variety of clients to increase their online presents with tailor-made websites and apps.",
  },
];

export const jobsPerYear: YearOfJobs[] = allJobs.reduce((acc, job) => {
  const year = acc.find((y) => y.year === job.year);
  if (year) {
    year.jobs.push(job);
  } else {
    acc.push({ year: job.year, jobs: [job] });
  }
  return acc;
}, [] as YearOfJobs[]);
