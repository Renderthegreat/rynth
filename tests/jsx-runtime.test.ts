import { jsx, Fragment } from '../src/jsx-runtime.ts';
import { Signal } from '../src/signal.ts';

Deno.test('jsx runtime normalizes nested primitive children without recursion', () => {
	const result = jsx(Fragment, {
		children: ['hello', [1, false, 'world']],
	});

	if (result.children.length !== 4) {
		throw new Error(`expected 4 flattened children, got ${result.children.length}`);
	}

	if (result.children[0] !== 'hello') {
		throw new Error('first child should be hello');
	}

	if (result.children[1] !== 1) {
		throw new Error('number child should be preserved');
	}

	if (result.children[2] !== false) {
		throw new Error('boolean child should be preserved');
	}

	if (result.children[3] !== 'world') {
		throw new Error('last child should be world');
	}
});

Deno.test('jsx runtime leaves signal children intact', () => {
	const signal = new Signal('signal value');
	const result = jsx(Fragment, { children: [signal] });

	if (result.children.length !== 1) {
		throw new Error(`expected 1 child, got ${result.children.length}`);
	}

	if (result.children[0] !== signal) {
		throw new Error('signal child should be preserved without wrapping');
	}
});
