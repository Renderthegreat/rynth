import { Kind, } from '#~/style/types';

import Color from 'colorjs.io';

export enum FillType {
	Color,
	Gradient,
	Image,
};

export type Fill = 
	| Kind<FillType.Color, Color>
	| Kind<FillType.Gradient, Gradient>
	| Kind<FillType.Image, string>
;

export enum GradientType {
	Linear,
	Radial,
	Stop,
};

// 

/**
 * TODO: Document.
 */
export class Gradient {
	public constructor(
		public readonly data: (
			| Kind<GradientType.Linear, [Color, Color]>
			| Kind<GradientType.Radial, [Color, Color]>
			| Kind<GradientType.Stop, [number, Color][]>
		)
	) {

	};

	public toString(): string {
		switch (this.data.kind) {
			case GradientType.Linear: {
				return `linear-gradient(${this.data.value.map((color) => color.toString()).join(', ')})`;
			};
			case GradientType.Radial: {
				return `radial-gradient(${this.data.value.map((color) => color.toString()).join(', ')})`;
			};
			case GradientType.Stop: {
				return `linear-gradient(${this.data.value.map(([stop, color]) => `${stop * 100}% ${color.toString()}`).join(', ')})`;
			};
			// All types are exhausted, so no `default` block is required.
		};
	};
};

export class Image {
	public constructor(
		public readonly source: string,
	) {

	};

	public toString(): string {
		return `url(${this.source})`;
	};
};