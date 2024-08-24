import { Fragment } from "react";
import type { Job } from "./Experience.types";
import styles from "./Experience.module.sass";
import { cn } from "@/utils/css";
import { TextLine } from "@/components/AnimatedText/TextLine";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { jobsPerYear } from "./Experience.data";
import { JobLine } from "./JobLine";

type JobCardProps = {
  yearIndex: number;
  jobIndex: number;
  year: number;
  job: Job;
  isLastJobOfYear?: boolean;
  isLastYear?: boolean;
};

export const JobCard = ({
  yearIndex,
  year,
  jobIndex,
  job,
  isLastJobOfYear,
  isLastYear,
}: JobCardProps) => (
  <>
    {jobIndex === 0 && (
      <span className={cn(styles.year)}>
        <TextLine
          animatedTextProps={{
            fixedDuration: 600,
            delay: 1500 + yearIndex * 300,
          }}
          className={cn(styles.yearText)}
          hovering
        >
          {String(year)}
        </TextLine>
      </span>
    )}
    <article className={cn(styles.job)}>
      <header className={cn(styles.jobHeader)}>
        <TextLine
          className={cn(styles.title)}
          animatedTextProps={{
            fixedDuration: 600,
            delay: 1500 + yearIndex * 300,
          }}
        >
          {job.title}
        </TextLine>
        <TextLine
          animatedTextProps={{
            fixedDuration: 600,
            delay: 1500 + yearIndex * 300,
          }}
          className={cn(styles.employer)}
        >
          {job.employer.name}
        </TextLine>
      </header>
      {job.description && (
        <AnimatedText
          fixedDuration={600}
          delay={1800 + yearIndex * 300}
          whenVisible={yearIndex > 2}
          className={cn(styles.description)}
        >
          {job.description}
        </AnimatedText>
      )}
      {!(isLastYear && isLastJobOfYear) && <JobLine isYear={isLastJobOfYear} />}
    </article>
  </>
);
