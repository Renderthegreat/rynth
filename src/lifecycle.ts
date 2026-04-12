import { EventEmitter, } from 'eventemitter3';

export type LifecycleEvent =
	| 'mount'
//	| 'update'

	| 'pause'
	| 'resume'

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

	private resumé: Array<[LifecycleEvent, ...any]> = [];
	private paused: boolean = false;

	public constructor(
		private readonly methods: LifecycleMethods,
	) {
		super();

		this.on('pause', () => {
			this.paused = true;
		});

		this.on('resume', () => {
			this.paused = false;

			this.resumé.forEach(([event, ...args]) => {
				this.methods[event]?.();
				this.emit(event, ...args);
			});

			this.resumé = [];
		});
	};

	public override emit(event: LifecycleEvent, ...args: any): boolean {
		if (this.paused) {	
			this.resumé.push([event, ...args]);
		} else {
			this.methods[event]?.();
			super.emit(event, ...args);
		};

		return true;
	};

	public cleanup() {
		this.cleanupTasks.forEach(task => task());
		this.cleanupTasks = [];
	};
};