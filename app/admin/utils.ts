export const splitList = (value: string, delimiter: string) =>
  value
    .split(delimiter)
    .map((item) => item.trim())
    .filter(Boolean);
