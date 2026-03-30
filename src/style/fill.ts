import { Color, } from 'chroma-js';

export enum FillType {
	Color = 'color',
	Gradient = 'gradient',
	Image = 'image',
};

export type Fill = (
	| Color
) & {
	type: FillType;
};