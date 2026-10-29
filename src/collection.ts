import { Signal, } from "#~/signal.ts";

/**
 * TODO: Document.
 */
// export class Collection<T> extends Signal<Map<number, Signal<T>>> implements Map<number, Signal<T>> {
// 	// TODO: Make mappings!

// 	public clear(): void {
// 		this._value.clear();
// 		this.notify();
// 	};

// 	public delete(key: number): boolean {
// 		const result = this._value.delete(key);
// 		this.notify();

// 		return result;
// 	};

// 	public forEach(callbackfn: (value: Signal<T>, key: number, map: Map<number, Signal<T>>) => void, thisArg?: any): void {
// 		this._value.forEach(callbackfn, thisArg);

// 		this.notify();
// 	};
// };