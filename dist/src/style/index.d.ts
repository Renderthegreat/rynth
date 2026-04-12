import { Fill } from '#~/style/fill';
import { Font } from '#~/style/font';
export declare class Style {
    readonly createVariable: (value: string) => {
        value: string;
        name: string;
    };
    foreground?: Fill;
    background?: Fill;
    font?: Font;
    constructor(createVariable: (value: string) => {
        value: string;
        name: string;
    });
    toCSS(): CSSStyleDeclaration;
}
export declare class StyleSheet {
    readonly variables: Map<string, string>;
    createStyle(): Style;
}
export * from '#~/style/fill';
export * from '#~/style/font';
