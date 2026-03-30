import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type HeaderAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header HTMLHeaderElement}.
 */
export class Header implements ComponentFactory<HeaderAttributes> {
	public readonly symbol: symbol = Symbol('header');

	public of(config: ComponentConfig<HeaderAttributes>): Component<HeaderAttributes> {
		return new Component(this.symbol, config);
	};
};