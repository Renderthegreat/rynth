/**
 * This declaration is so large, it deserves its own file.
 * Clearly, *CSS* must stand for *Cascading Sh*t Show*.
 * Anyways, good luck! ;)
 */
import { FillType, } from '#~/style/fill';
function hex(rgba) {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}
;
export function toCSS(style) {
    const css = document.createElement('div').style; // This element should be disposed at the end of the function.
    // # Foreground
    if (style.foreground) {
        switch (style.foreground.type) {
            case FillType.Color:
                {
                    console.log(style.foreground);
                    css.color = hex(style.foreground._rgb);
                    break;
                }
                ;
        }
        ;
    }
    ;
    // # Background
    if (style.background) {
        switch (style.background.type) {
            case FillType.Color:
                {
                    console.log(style.background);
                    css.backgroundColor = hex(style.background._rgb);
                    break;
                }
                ;
        }
        ;
    }
    ;
    // # Font
    if (style.font) {
        css.fontFamily = style.font.font.family;
        css.fontSize = `${style.font.size}px`;
    }
    ;
    return css;
}
;
