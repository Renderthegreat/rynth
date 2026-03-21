import { Component, } from '#~/component';
import { Signal, } from '#~/signal';

export function hook(root: Component, callback: (component: Component, signal?: Signal<unknown>) => void): void {
	for (const child of root.config.children) {
		if (child instanceof Component) {
			hook(child, callback);
			continue;
		};

		if (child instanceof Signal) {
			child.listener = () => {
				callback(root, child);
			};
			continue;
		};
	};

	for (const [key, value] of Object.entries(root.config)) {
		// Not necessary, but to make the code more readable.
		if (key === 'children') {
			continue;
		};

		if (value instanceof Signal) {
			value.listener = () => {
				callback(root, value);
			};
			
			continue;
		};
	};
};