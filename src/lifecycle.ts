import { EventEmitter, } from 'eventemitter3';

export type LifecycleEvent =
	| 'mount'
// | 'update'
	| 'unmount'
	| 'dispose'
;

export type LifecycleMethods = {
	[key in LifecycleEvent]?: () => void;
};

export class Lifecycle extends EventEmitter<LifecycleEvent> {
	private cleanupTasks: Array<() => void> = [];
	public addCleanupTask(task: () => void) {
		this.cleanupTasks.push(task);
	};
	public cleanup() {
		this.cleanupTasks.forEach(task => task());
		this.cleanupTasks = [];
	};

	public constructor(
		private readonly methods: LifecycleMethods,
	) {
		super();
	};

	public emit(event: LifecycleEvent, ...args: any): boolean {
		this.methods[event]?.();
		super.emit(event, ...args);

		return true;
	};
};