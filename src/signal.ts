export class Signal<T> {
	private _value: T;
	private listeners: Array<(value: T) => void> = new Array();

	public constructor(value: T) {
		this._value = value;
	};

	public subscribe(listener: (value: T) => void): () => void {
		// Debug: log subscription creation (temporary)
		// console.debug('Signal.subscribe', listener);
		this.listeners.push(listener);

		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	};

	private notify(): void {
		for (const listener of this.listeners) {
			try {
				listener(this._value);
			}
			catch (err) {
				// TODO: Add error handling system.
			};
		};
	};

	public get value(): T {
		return this._value;
	};
	public set value(value: T) {
		this._value = value;
		this.notify();
	};

	public toString(): string {
		return String(this.value);
	};
};

/**
 * `T` or `Signal<T>`.
 */
export type Value<T> = T | Signal<T>;