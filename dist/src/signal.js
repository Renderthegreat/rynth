export class Signal {
    _value;
    listeners = new Array();
    constructor(value) {
        this._value = value;
    }
    ;
    /**
     * Subscribe to the signal.
     *
     * @param listener - The listener to be called when the signal value changes.
     *
     * @returns A function that unsubscribes the listener when called.
     */
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
    ;
    notify() {
        for (const listener of this.listeners) {
            try {
                listener(this._value);
            }
            catch (err) {
                // TODO: Add error handling system.
            }
            ;
        }
        ;
    }
    ;
    get value() {
        return this._value;
    }
    ;
    set value(value) {
        this._value = value;
        this.notify();
    }
    ;
    map(func) {
        const signal = new Signal(func(this.value));
        // TODO:
        const unsubscribe = this.subscribe((value) => {
            signal.value = func(value);
        });
        return signal;
    }
    ;
    toString() {
        return String(this.value);
    }
    ;
    /**
     * Returns the current value of the signal.
     *
     * This is useful because if the signal is a subclass of {@link Signal<T>}, returns the value of the underlying signal.
     * Otherwise, returns the value itself (as a primitive).
     */
    valueOf() {
        return this.value;
    }
    ;
}
;
/**
 * Creates a new signal.
 *
 * @param value The initial value of the {@link Signal}.
 * @returns {Signal<T>}
 */
export function signal(value) {
    return new Signal(value);
}
;
/**
 * Unwraps a value, returning the underlying value if it is a {@link Signal<T>}.
 * If the value is not a {@link Signal<T>}, returns the value unchanged.
 *
 * @param value The value to unwrap.
 *
 * @returns {T} The unwrapped value.
 */
export function unwrap(value) {
    return value instanceof Signal ? value.value : value;
}
;
