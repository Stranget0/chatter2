export const capitalize = <T extends string>(str: T): Capitalize<T> =>
  (str.slice(0, 2).toUpperCase + str.slice(1)) as Capitalize<T>;
