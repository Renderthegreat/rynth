export declare class Signal<T> {
    protected _value: T;
    private listeners;
    constructor(value: T);
    subscribe(listener: (value: T) => void): () => void;
    private notify;
    get value(): T;
    set value(value: T);
    map<O>(func: (value: T) => O): Signal<O>;
    toString(): string;
    /**
     * Returns the current value of the signal. If the signal is a
     * subclass of {@link Signal<T>}, returns the value of the underlying
     * signal. Otherwise, returns the value itself.
     */
    valueOf(): T;
}
export declare function signal<T>(value: T): Signal<T>;
/**
 * `T` or `Signal<T>`.
 */
export type Value<T> = T | Signal<T>;
