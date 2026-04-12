import { EventEmitter } from 'eventemitter3';
export type LifecycleEvent = 'mount' | 'pause' | 'resume' | 'unmount' | 'dispose';
export type LifecycleMethods = {
    [key in LifecycleEvent]?: () => void;
};
export declare class Lifecycle extends EventEmitter<LifecycleEvent> {
    private readonly methods;
    private cleanupTasks;
    addCleanupTask(task: () => void): void;
    private resumé;
    private paused;
    constructor(methods: LifecycleMethods);
    emit(event: LifecycleEvent, ...args: any): boolean;
    cleanup(): void;
}
