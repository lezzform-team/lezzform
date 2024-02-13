export type DeepObject<T> = {
  [P in keyof T]: T[P] extends object ? DeepObject<T[P]> : T[P];
};

export type ReplaceDeepestValue<T, R, KeyName extends string> = T extends object
  ? {
      [K in keyof T]: K extends KeyName
        ? R
        : T[K] extends object
          ? ReplaceDeepestValue<T[K], R, KeyName>
          : T[K];
    }
  : T;
