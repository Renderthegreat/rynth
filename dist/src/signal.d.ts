export declare class Signal<T> {
    protected _value: T;
    private listeners;
    constructor(value: T);
    /**
     * Subscribe to the signal.
     *
     * @param listener - The listener to be called when the signal value changes.
     *
     * @returns A function that unsubscribes the listener when called.
     */
    subscribe(listener: (value: T) => void): () => void;
    protected notify(): void;
    get value(): T;
    set value(value: T);
    map<O>(func: (value: T) => O): Signal<O>;
    toString(): string;
    /**
     * Returns the current value of the signal.
     *
     * This is useful because if the signal is a subclass of {@link Signal<T>}, returns the value of the underlying signal.
     * Otherwise, returns the value itself (as a primitive).
     */
    valueOf(): T;
}
/**
 * Creates a new signal.
 *
 * @param value The initial value of the {@link Signal}.
 * @returns {Signal<T>}
 */
export declare function signal<T>(value: T): Signal<T>;
/**
 * `T` or `Signal<T>`.
 */
export type Value<T> = T | Signal<T>;
/**
 * Unwraps a value, returning the underlying value if it is a {@link Signal<T>}.
 * If the value is not a {@link Signal<T>}, returns the value unchanged.
 *
 * @param value The value to unwrap.
 *
 * @returns {T} The unwrapped value.
 */
export declare function unwrap<T>(value: Value<T>): T;
/**
 * `Signal<T>` → `T`.
 */
export type Unwrapped<T> = T extends Signal<infer U> ? U : T;
