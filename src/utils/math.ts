export const isBetween = (n: number, min: number, max: number) =>
  n <= max && n >= min;

export function isDefined<T = unknown>(n: T | undefined): n is T {
  return n !== undefined;
}

const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

function convertMillions(num: number): string {
  if (num >= 1000000) {
    return (
      convertMillions(Math.floor(num / 1000000)) +
      " million " +
      convertThousands(num % 1000000)
    );
  } else {
    return convertThousands(num);
  }
}

function convertThousands(num: number): string {
  if (num >= 1000) {
    return (
      convertHundreds(Math.floor(num / 1000)) +
      " thousand " +
      convertHundreds(num % 1000)
    );
  } else {
    return convertHundreds(num);
  }
}

function convertHundreds(num: number): string {
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convertTens(num % 100);
  } else {
    return convertTens(num);
  }
}

function convertTens(num: number): string {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}

export function numberToString(num: number): string {
  if (num == 0) return "zero";
  else return convertMillions(num);
}

/**
 * Linearly interpolates between two numbers.
 *
 * @param {number} a - The start value.
 * @param {number} b - The end value.
 * @param {number} t - The interpolation parameter.
 * @return {number} The interpolated value.
 */
export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};
