import { Component, } from '#~/component.ts';
import { Signal, } from '#~/signal.ts';

// TODO: A lot of stuff...
export function hook(root: Component, callback: (component: Component, signal?: Signal<unknown>) => void): void {
	for (const child of root.children) {
		if (child instanceof Component) {
			hook(child, callback);

			continue;
		};

		if (child instanceof Signal) {
			console.log(child);

			const unsubscribe = child.subscribe(() => {
				callback(root, child);

				// TODO: Check if this is correct.
				unsubscribe(); // Auto unsubscribe because a new subscription will be created.
			});

			const value = child.value;

			if (value instanceof Component) {
				// TODO: Determine if this is correct.
				hook(value, callback);
			};

			root.lifecycle.addCleanupTask(unsubscribe);

			continue;
		};

		// TODO: Figure this out.
		/*if (child instanceof Array) {
			for (const item of child) {
				if (item instanceof Component) {
					hook(item, callback);
				};
			};
		};*/
	};

	for (const [key, value] of Object.entries(root.config)) {
		if (key === 'children' || key.startsWith('bind:')) {
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