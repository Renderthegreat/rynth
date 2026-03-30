import { Fill, } from "#~/style/fill";
import { Font, } from "#~/style/font";

import { toCSS, } from "#~/style/toCSS";

export class Style {
	public foreground?: Fill;
	public background?: Fill;

	public font?: Font;

	public constructor() {

	};

	public toCSS(): CSSStyleDeclaration {
		return toCSS(this);
	};
};

export * from '#~/style/fill';
export * from '#~/style/font';