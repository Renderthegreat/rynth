import { Signal, Unwrapped, } from '#~/signal';

import { ArrayElement, } from 'type-fest';

type FunctionParams<Params extends (Signal<any>)[]> = {
	[K in keyof Params]: Unwrapped<Params[K]>;
};

export class Computed<T, Params extends (Signal<any>)[]> extends Signal<Readonly<T>> {
	private unsubscribeFunctions: (() => void)[] = [];

	// private computedValue: T;
	/*public override get value(): T {
		return this.computedValue;
	};*/

	public constructor(
		private parameters: [...Params], // Spread tuple.
		protected func: (this: Readonly<T> | undefined, ...args: FunctionParams<Params>) => T,
	) {
		super(undefined as any);

		for (const parameter of this.parameters) {
			const unsubscribe = parameter.subscribe(() => this.compute());

			this.unsubscribeFunctions.push(unsubscribe);
		};

		this.value = this.compute();
	};

	public compute(): T {
		// Use a type assertion for the spread for when the compiler complains about the map result not matching the tuple length exactly.
		const values = this.parameters.map((p) => p.value) as any;

		const previousValue = this._value;

		const value = this.func.call(previousValue, ...values);

		this._value = value;

		// TODO: Safe call.
		return this.value = value;
	};
};

/**
 * Creates a computed signal.
 * 
 * @param parameters The inputs to the computing function.
 * @param func The computing function.
 * 
 * @returns {Computed<T>}
 */
export function computed<T, Params extends (Signal<any>)[]>(parameters: [...Params], func: (this: Readonly<T> | undefined, ...args: FunctionParams<Params>) => T): Computed<T, Params> {
	const computed = new Computed(parameters, func);

	return computed;
};