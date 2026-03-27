import { Signal, } from '#~/signal';
import { Lifecycle, } from '#~/lifecycle';

export type Config<T> = {
	children: Array<Child>;
} & Pick<T, Exclude<keyof T, 'children'>>;

export class Component<C = unknown> {
	public readonly key: symbol = Symbol();

	public readonly lifecycle: Lifecycle = new Lifecycle({
		
	});

	public constructor(
		public readonly type: symbol,
		public readonly config: Config<C>,
	) {
		// Bind disposal so `this` is preserved and disposal doesn't
		// get called with an incorrect context.
		this.lifecycle.on('unmount', () => this.dispose());
	};

	/**
	 * Disposes of the {@link Component}, and all of its children.
	 */
	private dispose(): void {
		this.lifecycle.cleanup();
		
		// Recursively dispose of children
		for (const child of this.config.children) {
			if (child instanceof Component) {
				// Emit `unmount` on children so their lifecycle handlers
				// run and cleanup is centralized through the lifecycle.
				child.lifecycle.emit('unmount');
			};
		};
	};
};

export type Child = (Component | Signal<any> | string);

export interface ComponentFactory<C> {
	of(config: Config<C>): Component<C>;

	symbol: symbol;
};