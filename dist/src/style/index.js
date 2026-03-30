import { toCSS, } from "#~/style/toCSS";
export class Style {
    foreground;
    background;
    font;
    constructor() {
    }
    ;
    toCSS() {
        return toCSS(this);
    }
    ;
}
;
export * from '#~/style/fill';
export * from '#~/style/font';
