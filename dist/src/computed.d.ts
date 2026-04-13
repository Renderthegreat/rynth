import { Signal, Unwrapped } from '#~/signal';
type FunctionParams<Params extends (Signal<any>)[]> = {
    [K in keyof Params]: Unwrapped<Params[K]>;
};
export declare class Computed<T, Params extends (Signal<any>)[]> extends Signal<Readonly<T>> {
    private parameters;
    protected func: (this: Readonly<T> | undefined, ...args: FunctionParams<Params>) => T;
    private unsubscribeFunctions;
    constructor(parameters: [...Params], // Spread tuple.
    func: (this: Readonly<T> | undefined, ...args: FunctionParams<Params>) => T);
    compute(): T;
}
/**
 * Creates a computed signal.
 *
 * @param parameters The inputs to the computing function.
 * @param func The computing function.
 *
 * @returns {Computed<T>}
 */
export declare function computed<T, Params extends (Signal<any>)[]>(parameters: [...Params], func: (this: Readonly<T> | undefined, ...args: FunctionParams<Params>) => T): Computed<T, Params>;
export {};
