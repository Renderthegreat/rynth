import { Signal, } from '#~/signal';
export class Computed extends Signal {
    parameters;
    func;
    unsubscribeFunctions = [];
    // private computedValue: T;
    /*public override get value(): T {
        return this.computedValue;
    };*/
    constructor(parameters, // Spread tuple.
    func) {
        super(undefined);
        this.parameters = parameters;
        this.func = func;
        for (const parameter of this.parameters) {
            const unsubscribe = parameter.subscribe(() => this.compute());
            this.unsubscribeFunctions.push(unsubscribe);
        }
        ;
        this.value = this.compute();
    }
    ;
    compute() {
        // Use a type assertion for the spread for when the compiler complains about the map result not matching the tuple length exactly.
        const values = this.parameters.map((p) => p.value);
        const previousValue = this._value;
        const value = this.func.call(previousValue, ...values);
        this._value = value;
        // TODO: Safe call.
        return this.value = value;
    }
    ;
}
;
/**
 * Creates a computed signal.
 *
 * @param parameters The inputs to the computing function.
 * @param func The computing function.
 *
 * @returns {Computed<T>}
 */
export function computed(parameters, func) {
    const computed = new Computed(parameters, func);
    return computed;
}
;
