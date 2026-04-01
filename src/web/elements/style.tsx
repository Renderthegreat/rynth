import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type StyleAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style HTMLStyleElement}.
 */
export class Style implements ComponentFactory<StyleAttributes> {
	public readonly symbol: symbol = Symbol('style');

	public of(config: ComponentConfig<StyleAttributes>): Component<StyleAttributes> {
		return new Component(this.symbol, config);
	};
};