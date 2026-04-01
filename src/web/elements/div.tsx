import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type DivAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div HTMLDivElement}.
 */
export class Div implements ComponentFactory<DivAttributes> {
	public readonly symbol: symbol = Symbol('div');

	public of(config: ComponentConfig<DivAttributes>): Component<DivAttributes> {
		return new Component(this.symbol, config);
	};
};