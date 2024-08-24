export type Employer = {
  name: string;
  url?: string;
};

export type Job = {
  year: number;
  current?: boolean;
  title: string;
  employer: Employer;
  description?: string;
};

export type YearOfJobs = {
  year: number;
  jobs: Job[];
};
