export abstract class Iterator<T extends any> {
    protected static readonly StartIndex: number = -1;
    protected _currentIndex: number
    protected readonly _items: T[];

    protected constructor(items: T[] = []) {
        this._currentIndex = Iterator.StartIndex
        this._items = items;
    }

    get size(): number {
        return this._items.length
    }

    reset(): void {
        this._currentIndex = Iterator.StartIndex
    }

    get current(): T | undefined {
        return this._items[this._currentIndex];
    }

    hasNext(): boolean {
        return this._currentIndex < this._items.length - 1
    }

    next(): T | undefined {
        this._currentIndex++
        return this.current
    }

    seek(index: number): void {
        index = Math.min(Math.max(index, 0), this.size - 1);
        this._currentIndex = index
    }

    findIndex(predicate: (item: T, index: number, dataSource: T[]) => unknown): number {
        return this._items.findIndex(predicate)
    }
}