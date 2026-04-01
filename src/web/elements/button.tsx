import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export type ButtonAttributes = { click?: () => void, } & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button HTMLButtonElement}.
 */
export class Button implements ComponentFactory<ButtonAttributes> {
	public readonly symbol: symbol = Symbol('button');

	public of(config: ComponentConfig<ButtonAttributes>): Component<ButtonAttributes> {
		const component = new Component(this.symbol, config);

		// Attach the click listener directly to the rendered button element
		// to avoid nested bridge/event-target issues.
		component.lifecycle.on('mount', ({ node, }: { node: Node; }) => {
			const buttonElement = node as HTMLButtonElement;

			buttonElement.addEventListener('click', () => {
				config.click?.();
			});
		});

		return component;
	};
};