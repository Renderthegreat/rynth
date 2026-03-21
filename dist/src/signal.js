export class Signal {
    _value;
    listener = (value) => { };
    constructor(value) {
        this._value = value;
    }
    ;
    toString() {
        return String(this.value);
    }
    ;
    get value() {
        return this._value;
    }
    ;
    set value(value) {
        this._value = value;
        this.listener(value);
    }
    ;
}
;
