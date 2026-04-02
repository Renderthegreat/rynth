import { Kind } from '#~/style/types';
import Color from 'colorjs.io';
export declare enum FillType {
    Color = 0,
    Gradient = 1,
    Image = 2
}
export type Fill = Kind<FillType.Color, Color> | Kind<FillType.Gradient, Gradient> | Kind<FillType.Image, string>;
export declare enum GradientType {
    Linear = 0,
    Radial = 1,
    Stop = 2
}
/**
 * TODO: Document.
 */
export declare class Gradient {
    readonly data: (Kind<GradientType.Linear, [Color, Color]> | Kind<GradientType.Radial, [Color, Color]> | Kind<GradientType.Stop, [number, Color][]>);
    constructor(data: (Kind<GradientType.Linear, [Color, Color]> | Kind<GradientType.Radial, [Color, Color]> | Kind<GradientType.Stop, [number, Color][]>));
    toString(): string;
}
export declare class Image {
    readonly source: string;
    constructor(source: string);
    toString(): string;
}
