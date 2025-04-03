export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Undefinable<T> = T | undefined;

export type Dictionary<T> = {
  [Key: string | number]: Undefinable<T>;
};
export type DefinedDictionary<T> = {
  [Key: string | number]: T;
};
export type TypedDictionary<K extends keyof any, T> = {
  [Key in K]: Undefinable<T>;
};
