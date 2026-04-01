import { Component, ComponentFactory, ComponentConfig, } from '#~/index';

import { CommonAttributes } from '../common';

export enum CanvasContextType {
	ImageBitmap = 'imagebitmap',
	Path2D = '2d',
	WebGL = 'webgl',
	WebGL2 = 'webgl2',
};

export type CanvasAttributes = { } & CommonAttributes;
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas HTMLCanvasElement}.
 * This is a very complicated element to implement.
 * I don't think I have what it takes to do it.
 */
export class Canvas implements ComponentFactory<CanvasAttributes> {
	public readonly symbol: symbol = Symbol('canvas');

	private canvas?: HTMLCanvasElement;

	public of(config: ComponentConfig<CanvasAttributes>): Component<CanvasAttributes> {
		const component = new Component(this.symbol, config);
		
		component.lifecycle.on('mount', ({ node, }: { node: Node; }) => {
			this.canvas = node as HTMLCanvasElement;
		});

		return component;
	};

	/**
	 * Don't use this unless you are building a better `Canvas` API.
	 */
	public _getRenderingContext(type: CanvasContextType): RenderingContext | null {
		return this.canvas!.getContext(type);
	};
};