import * as Rynth from '#~/index';

import { Body, Head, Header, Div, Button, If, } from '#~/web/elements';

import { Style, FillType, } from '#~/style/index';

import chroma from 'chroma-js';

export type Theme = 'light' | 'dark';

const mode = Rynth.signal<Theme>(
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);

export const app =
	<Body>
		<Header>
			My App
		</Header>
	</Body>
;

const appStyle: Style = new Style();

appStyle.background = {
	type: FillType.Color,

	...(chroma.oklab(0.1, 0.1, 0.1)),
};

console.log(appStyle.toCSS());