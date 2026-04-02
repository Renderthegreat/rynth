/**
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 */
export type Kind<L, T> = {
    kind: L;
    value: T;
};
