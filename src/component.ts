import { Signal, } from '#~/signal';

export type Config<T> = {
	children: Array<Child>;
} & {  
	[K in Exclude<keyof T, 'children'>]: T[K];
};

export class Component<C = unknown> {
	public readonly key: symbol = Symbol();

	public constructor(
		public readonly type: symbol,
		public readonly config: Config<C>,
	) {

	};
};

export type Child = (Component | Signal<any> | string);

export interface ComponentFactory<C> {
	of(config: Config<C>): Component<C>;

	symbol: symbol;

	
};