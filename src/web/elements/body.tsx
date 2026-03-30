import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type BodyAttributes = {} & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement HTMLBodyElement}.
 */
export class Body implements ComponentFactory<BodyAttributes> {
	public readonly symbol: symbol = Symbol('body');

	public of(config: ComponentConfig<BodyAttributes>): Component<BodyAttributes> {
		return new Component(this.symbol, config);
	};
};