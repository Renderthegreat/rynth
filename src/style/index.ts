import { Fill, } from '#~/style/fill';
import { Font, } from '#~/style/font';

import { toCSS, } from '#~/style/toCSS';

export class Style {
	public foreground?: Fill;
	public background?: Fill;

	public font?: Font;

	public constructor(
		public readonly createVariable: (value: string) => { value: string, name: string, },
	) {

	};

	public toCSS(): CSSStyleDeclaration {
		return toCSS(this);
	};
};

export class StyleSheet {
	public readonly variables: Map<string, string> = new Map();

	public createStyle(): Style {
		return new Style((value: string) => {
			const UUID = crypto.randomUUID();

			this.variables.set(UUID, value);

			return {
				value: `var(--${UUID})`,
				name: UUID,
			};
		});
	};
};

export * from '#~/style/fill';
export * from '#~/style/font';