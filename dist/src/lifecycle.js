import { EventEmitter, } from 'eventemitter3';
export class Lifecycle extends EventEmitter {
    methods;
    cleanupTasks = [];
    addCleanupTask(task) {
        this.cleanupTasks.push(task);
    }
    ;
    resumé = [];
    paused = false;
    constructor(methods) {
        super();
        this.methods = methods;
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
    }
    ;
    emit(event, ...args) {
        if (this.paused) {
            this.resumé.push([event, ...args]);
        }
        else {
            this.methods[event]?.();
            super.emit(event, ...args);
        }
        ;
        return true;
    }
    ;
    cleanup() {
        this.cleanupTasks.forEach(task => task());
        this.cleanupTasks = [];
    }
    ;
}
;
