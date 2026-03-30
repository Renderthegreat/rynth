/**
 * This declaration is so large, it deserves its own file.
 * Clearly, *CSS* must stand for *Cascading Sh*t Show*.
 * Anyways, good luck! ;)
 */

import { Style, } from '#~/style/index';

import { FillType, } from '#~/style/fill';

function rgba(rgba: [number, number, number, number]): string {
	return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
};

export function toCSS(style: Style): CSSStyleDeclaration {
	const css = document.createElement('div').style; // This element should be disposed at the end of the function.

	// # Foreground
	if (style.foreground) {
		switch (style.foreground.type) {
			case FillType.Color: {
				console.log(style.foreground);

				css.color = rgba(style.foreground._rgb as unknown as [number, number, number, number]);
				break;
			};

		};
	};

	// # Background
	if (style.background) {
		switch (style.background.type) {
			case FillType.Color: {
				console.log(style.background);

				css.backgroundColor = rgba(style.background._rgb as unknown as [number, number, number, number]);
				break;
			};

		};
	};

	// # Font
	if (style.font) {
		css.fontFamily = style.font.font.family;
		css.fontSize = `${style.font.size}px`;
	};

	return css;
};