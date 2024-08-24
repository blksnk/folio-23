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

const lerp = (a: number, b: number, alpha: number): number => {
  return a + alpha * (b - a);
};

const computeMargin = (
  index: number,
  count: number,
  from: number,
  to: number
): number => {
  const factor = (index + 1) / count;
  return lerp(from, to, factor);
};

export const LineGroup = (props: LineGroupProps): JSX.Element => {
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
          ></div>
        );
      })}
    </div>
  );
};
