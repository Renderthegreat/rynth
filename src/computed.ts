import { Signal, Unwrapped, } from '#~/signal';

import { ArrayElement, } from 'type-fest';


export class Computed<T, Params extends (Signal<any>)[]> extends Signal<Readonly<T>> {
	public constructor(
		protected parameters: Params,
		protected func: (...args: (Unwrapped<ArrayElement<Params>>)[]) => T,
	) {
		super(undefined as any);
		super.value = this.compute();
	};

	public override get value(): T {
		return this.compute();
	};

	public compute(): T {
		return super.value = this.func(...this.parameters.map((param) => param.value));
	};
};

export function computed<T, Params extends (Signal<any>)[]>(parameters: Params, func: (...args: (Unwrapped<ArrayElement<Params>>)[]) => T): Computed<T, Params> {
	const computed = new Computed(parameters, func);

	return computed;
};