import {IEventMap} from "../event/types";
import EventEmitter from "../event/event_emitter";
import {IIDable} from "../types";

interface QueueEventMap<T extends IIDable> extends IEventMap {
    current_item_changed: T | undefined;
    items_changed: T[];
    items_cleaned: never
}

export class Queue<T extends IIDable> extends EventEmitter<QueueEventMap<T>> {
    private static noItemIndex = -1
    protected _items: T[]
    protected _currentIndex;

    constructor() {
        super();
        this._items = []
        this._currentIndex = Queue.noItemIndex
    }

    get items(): T[] {
        return this._items;
    }

    get current(): T | undefined {
        return this._items[this._currentIndex];
    }

    get size(): number {
        return this._items.length
    }

    isHead(): boolean {
        return this._currentIndex === 0
    }

    isTail(): boolean {
        return this._currentIndex === this.size - 1
    }

    findIndex(t: string | T): number {
        if (typeof t === "string") {
            return this._items.findIndex(i => i.id === t)
        }
        return this._items.findIndex(i => i.id === t.id)
    }

    has(t: string | T): boolean {
        return this.findIndex(t) != -1
    }

    clear(): void {
        this._items = []
        this._currentIndex = Queue.noItemIndex
        this.emit("items_cleaned")
    }

    apply(ts: T[]): void {
        this.clear()
        this._items = [...ts]
        this.emit("items_changed", this._items)
    }

    append(t: T): void {
        if (this.has(t)) {
            return
        }
        this._items.push(t)
        this.emit("items_changed", this._items)
    }

    insert(t: T): void {
        if (this.has(t)) {
            return
        }
        if (this._currentIndex === Queue.noItemIndex) {
            this._items.push(t);
        } else {
            this._items.splice(this._currentIndex + 1, 0, t)
        }
        this.emit("items_changed", this.items)
    }

    delete(t: T): void {
        if (!this.size) {
            return
        }
        if (this.size === 1) {
            this.clear()
            return
        }

        const delIndex = this.findIndex(t)
        if (delIndex === -1) {
            return
        }
        if (delIndex === this._currentIndex) {
            this.next()
        }
        this._items.splice(delIndex, 1)
        if (delIndex <= this._currentIndex) {
            this._currentIndex--
        }
        this.emit("items_changed", this._items)
    }

    next(): void {
        if (!this.size) {
            return
        }
        this._currentIndex = (this._currentIndex + 1) % this.size
        this.emit("current_item_changed", this.current)
    }

    previous(): void {
        if (!this.size) {
            return
        }
        this._currentIndex = (this._currentIndex - 1 + this.size) % this.size
        this.emit("current_item_changed", this.current)
    }

    select(t: string | T): void {
        const index = this.findIndex(t)
        if (index === -1) {
            return
        }
        if (index === this._currentIndex) {
            return
        }
        this._currentIndex = index
        this.emit("current_item_changed", this.current)
    }
}