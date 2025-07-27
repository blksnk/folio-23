import styles from "./lines.module.sass";

interface LineGroupProps {
  count: number;
  spacing:
    | number
    | string
    | {
        from: number;
        to: number;
      };
  direction: "horizontal" | "vertical";
}

const lerp = (from: number, to: number, alpha: number): number => {
  return from + alpha * (to - from);
};

const computeMargin = (
  index: number,
  count: number,
  from: number,
  to: number
): number => {
  const factor = (index + 1) / count;
  return lerp(from ?? 4, to ?? 4, factor);
};

export const LineGroup = (props: LineGroupProps) => {
  const groupClass = `${styles.lineGroup} ${styles[props.direction]}`;
  const lines = Array(props.count).fill(null);
  const marginProp =
    props.direction === "vertical" ? "marginRight" : "marginBottom";
  return (
    <div className={groupClass}>
      {lines.map((_, index) => {
        const margin =
          typeof props.spacing === "number" || typeof props.spacing === "string"
            ? props.spacing
            : computeMargin(
                index,
                props.count,
                props.spacing.from,
                props.spacing.to
              );
        return (
          <div
            key={"line" + index}
            style={{ [marginProp]: margin }}
            className={styles.line}
          />
        );
      })}
    </div>
  );
};
