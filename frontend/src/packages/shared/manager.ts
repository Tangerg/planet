import {IClearable, IIDable} from "../types";
import {ILogger} from "../logger";

export class Manager<T extends IIDable> implements IClearable {
    protected register: Map<string, T>
    protected logger: ILogger

    constructor(logger: ILogger) {
        this.register = new Map<string, T>();
        this.logger = logger;
    }

    has(t: T | string): boolean {
        if (typeof t === "string") {
            return this.register.has(t);
        }
        return this.register.has(t.id)
    }

    apply(ts: T[]): void {
        this.clear()
        ts.forEach(t => {
            this.put(t)
        })
    }

    put(t: T): void {
        if (!t.id) {
            this.logger.warn("the item must have an id")
            return
        }
        if (this.has(t)) {
            this.logger.warn(`the item ${t.id} should be add only once`)
            return;
        }
        this.register.set(t.id, t)
    }

    delete(t: T | string): void {
        if (typeof t === "string") {
            this.register.delete(t)
            return
        }
        this.register.delete(t.id)
    }

    get(id: string): Readonly<T> | undefined {
        return this.register.get(id)
    }

    get size(): number {
        return this.register.size
    }

    clear() {
        this.register.clear()
    }

    items(): T[] {
        return Array.from(this.register.values())
    }
}