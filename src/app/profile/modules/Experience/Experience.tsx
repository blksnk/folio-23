import styles from "./Experience.module.sass";
import { jobsPerYear } from "./Experience.data";
import { JobCard } from "./JobCard";

export const Experience = () => {
  return (
    <section className={styles.experience}>
      {jobsPerYear.map(({ year, jobs }, yearIndex) =>
        jobs.map((job, jobIndex) => (
          <JobCard
            key={"year-" + year + "-job-" + jobIndex}
            job={job}
            year={year}
            yearIndex={yearIndex}
            jobIndex={jobIndex}
            isLastJobOfYear={jobIndex === jobs.length - 1}
            isLastYear={yearIndex === jobsPerYear.length - 1}
          />
        ))
      )}
    </section>
  );
};
