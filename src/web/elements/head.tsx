import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type HeadAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement HTMLHeadElement}.
 */
export class Head implements ComponentFactory<HeadAttributes> {
	public readonly symbol: symbol = Symbol('head');

	public of(config: ComponentConfig<HeadAttributes>): Component<HeadAttributes> {
		return new Component(this.symbol, config);
	};
};