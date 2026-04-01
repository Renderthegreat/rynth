import * as Rynth from '#~/index';

import { Body, Head, Header, Div, Button, Canvas, Break, If, } from '#~/web/elements';

import { Style, StyleSheet, FillType, } from '#~/style/index';

import { CommonAttributes } from '#~/web/common';

import Color from 'colorjs.io';

export type Theme = 'light' | 'dark';

const mode = Rynth.signal<Theme>(
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);

const counter = Rynth.signal(0);

export const app: Rynth.Component<CommonAttributes> = <>
	<Head>
		{}
	</Head>
	<Body>
		<Header>
			<>My App</>
		</Header>
		Counter is {counter}.
		<Break/>
		<Button
			click={()=>{
				counter.value++;
			}}
		>Click here to increment the counter</Button>
		<Break/>
		<Canvas></Canvas>
	</Body>
</>;