export class Signal<T> {
	private _value: T;
	public listener: (value: T) => void = (value: T) => {};

	public constructor(value: T) {
		this._value = value;
	};

	public toString(): string {
		return String(this.value);
	};

	public get value() {
		return this._value;
	};
	public set value(value: T) {
		this._value = value;

		this.listener(value);
	};
};

/**
 * `T` or `Signal<T>`.
 */
export type Value<T> = T | Signal<T>;