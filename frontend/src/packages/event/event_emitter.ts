import {IEventEmitter, IEventListener, IEventMap} from "./types";
import {createOnceFunction} from "../shared";

type EventListener = {
    fn: Function
    _this: Object
}
type EventListeners = Array<Readonly<EventListener>>

export class EventEmitter<E extends IEventMap> implements IEventEmitter<E> {
    private readonly register: Map<keyof E, EventListeners>

    constructor() {
        this.register = new Map<keyof E, EventListeners>();
    }

    on<K extends keyof E>(name: K, listener: IEventListener<E, K>, _this: Object = this): IEventEmitter<E> {
        if (!this.register.has(name)) {
            this.register.set(name, [])
        }
        this.register.get(name)!.push({fn: listener, _this})
        return this;
    }

    once<K extends keyof E>(name: K, listener: IEventListener<E, K>, _this: Object = this): IEventEmitter<E> {
        const onceFunc = createOnceFunction(listener, () => {
            this.off(name, onceFunc)
        })
        return this.on(name, onceFunc, _this)
    }

    off<K extends keyof E>(name: K, fn?: IEventListener<E, K>): IEventEmitter<E> {
        if (!this.register.has(name)) {
            return this
        }
        if (!fn) {
            this.register.set(name, [])
            return this
        }
        const listeners = this.register.get(name)!
        let count = listeners.length
        while (count--) {
            if (listeners[count].fn === fn) {
                listeners.splice(count, 1)
            }
        }

        return this
    }

    emit<K extends keyof E>(name: K, arg?: E[K]): void {
        if (!this.register.has(name)) {
            return
        }
        const listeners = this.register.get(name)!
        listeners.forEach((listener) => {
            if (listener.fn) {
                listener.fn.call(listener._this, arg)
            }
        })
    }

    clear(): void {
        this.register.clear()
    }

}

export default EventEmitter;