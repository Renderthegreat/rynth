import { Component, } from '#~/component';
import { Signal, } from '#~/signal';

export function hook(root: Component, callback: (component: Component, signal?: Signal<unknown>) => void): void {
	for (const child of root.config.children) {
		if (child instanceof Component) {
			hook(child, callback);

			continue;
		};

		if (child instanceof Signal) {
			const unsubscribe = child.subscribe(() => {
				callback(root, child);
			});

			root.lifecycle.addCleanupTask(unsubscribe);

			continue;
		};
	};

	for (const [key, value] of Object.entries(root.config)) {
		if (key === 'children') {
			continue;
		};

		if (value instanceof Signal) {
			const unsubscribe = value.subscribe(() => {
				callback(root, value);
			});

			root.lifecycle.addCleanupTask(unsubscribe);
			
			continue;
		};
	};
};