// deno-lint-ignore-file adjacent-overload-signatures

/**
 * TODO: Document.
 */
export class Signal<T> {
	protected _value: T;

	private listeners: Set<(value: T) => void> = new Set();
	private unsubscriptions: Set<() => void> = new Set();

	private destroyed = false;

	public constructor(value: T) {
		this._value = value;
	};


	/**
	 * Subscribe to the signal.
	 * 
	 * @param listener - The listener to be called when the signal value changes.
	 * 
	 * @returns A function that unsubscribes the listener when called.
	 */
	public subscribe(listener: (value: T) => void): () => void {
		this.listeners.add(listener);

		const unsubscribe = () => {
			this.listeners.delete(listener);
		};

		this.unsubscriptions.add(unsubscribe);

		return unsubscribe;
	};

	protected notify(): void {
		for (const listener of this.listeners) {
			try {
				listener(this._value);
			} catch (err) {
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

	public map<O>(func: (value: T) => O): Signal<O> {
		if (this.destroyed) {
			// TODO: Make a special error type like in `notify`.
		};

		const signal = new Signal<O>(func(this.value));

		const unsubscribe = this.subscribe((value: T) => {
			signal.value = func(value);
		});

		this.unsubscriptions.add(unsubscribe);
		this.unsubscriptions.add(() => {
			// Destroy the mapped signal since it can't recieve updates.
			signal.destroy();
		});

		return signal;
	};

	/**
	 * Destroys the signal and all subscriptions.
	 */
	public destroy(): void {
		console.log("Destroying!!!");

		if (this.destroyed) {
			// TODO: Make a special error type like in `notify`.
		};

		for (const unsubscribe of this.unsubscriptions) {
			unsubscribe();
		};

		this.destroyed = true;
	};

	public toString(): string {
		return String(this.value);
	};
	
	/**
	 * Returns the current value of the signal.
	 * 
	 * This is useful because if the signal is a subclass of {@link Signal<T>}, returns the value of the underlying signal.
	 * Otherwise, returns the value itself (as a primitive).
	 */
	public valueOf(): T {
		return this.value;
	};
};

/**
 * Creates a new signal.
 *
 * @param value The initial value of the {@link Signal}.
 * @returns {Signal<T>}.
 */
export function signal<T>(value: T): Signal<T> {
	const signal = new Signal<T>(value);

	return signal;
};

/**
 * `T` or `Signal<T>`.
 */
export type Value<T> = T | Signal<T>;

/**
 * Unwraps a value, returning the underlying value if it is a {@link Signal<T>}.
 * If the value is not a {@link Signal<T>}, returns the value unchanged.
 * 
 * @param value The value to unwrap.
 * 
 * @returns {T} The unwrapped value.
 */
export function unwrap<T>(value: Value<T>): T {
	return value instanceof Signal ? value.value : value;
};

/**
 * `Signal<T>` → `T`.
 */
export type Unwrapped<T> = T extends Signal<infer U> ? U : T;