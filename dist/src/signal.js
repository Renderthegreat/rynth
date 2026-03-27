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
        // Debug: log notifications (temporary)
        // console.debug('Signal.notify', this._value);
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
    toString() {
        return String(this.value);
    }
    ;
}
;
