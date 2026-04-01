/**
 * This declaration is so large, it deserves its own file.
 * Clearly, *CSS* must stand for *Cascading Sh*t Show*.
 * Anyways, good luck! ;)
 */
import { FillType, } from '#~/style/fill';
export function toCSS(style) {
    const css = document.createElement('div').style; // This element should be disposed at the end of the function.
    // # Foreground
    if (style.foreground) {
        switch (style.foreground.kind) {
            case FillType.Color:
                {
                    css.color = style.createVariable(style.foreground.value.toString()).value;
                    console.log(css.color);
                    break;
                }
                ;
        }
        ;
    }
    ;
    // # Background
    if (style.background) {
        switch (style.background.kind) {
            case FillType.Color:
                {
                    css.backgroundColor = style.createVariable(style.background.value.toString()).value;
                    console.log(css.backgroundColor);
                    break;
                }
                ;
        }
        ;
    }
    ;
    // # Font
    if (style.font) {
        css.fontFamily = style.createVariable(style.font.font.family).value;
        css.fontSize = style.createVariable(`${style.font.size}px`).value;
    }
    ;
    return css;
}
;
