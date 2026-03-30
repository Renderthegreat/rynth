export class Signal {
    _value;
    listeners = new Array();
    constructor(value) {
        this._value = value;
    }
    ;
    subscribe(listener) {
        // Debug: log subscription creation (temporary)
        // console.debug('Signal.subscribe', listener);
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
     * Returns the current value of the signal. If the signal is a
     * subclass of {@link Signal<T>}, returns the value of the underlying
     * signal. Otherwise, returns the value itself.
     */
    valueOf() {
        return this.value;
    }
    ;
}
;
export function signal(value) {
    return new Signal(value);
}
;
