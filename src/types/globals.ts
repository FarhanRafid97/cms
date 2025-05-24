export type OptionalAll<T> = {
  [P in keyof T]?: T[P];
};

export type PrettifyType<T> = {
  [K in keyof T]: T[K] extends object ? PrettifyType<T[K]> : T[K];
} & unknown;
