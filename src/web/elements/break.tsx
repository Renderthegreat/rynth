import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type BreakAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bR HTMLBRElement}.
 */
export class Break implements ComponentFactory<BreakAttributes> {
	public readonly symbol = Symbol('br');

	public of(config: ComponentConfig<BreakAttributes>) {
		return new Component<BreakAttributes>(this.symbol, config);
	};
};