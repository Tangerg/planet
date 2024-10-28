import {IClearable} from "../types";

export interface IEventMap {
    [key: string]: any;
}

export interface IEventListener<E extends IEventMap, K extends keyof E> extends Function {
    (arg: E[K]): void
}

export interface IEventEmitter<E extends IEventMap> extends IClearable {
    on<K extends keyof E>(name: K, listener: IEventListener<E, K>, _this?: Object): IEventEmitter<E>

    once<K extends keyof E>(name: K, listener: IEventListener<E, K>, _this?: Object): IEventEmitter<E>

    off<K extends keyof E>(name: K, fn?: IEventListener<E, K>): IEventEmitter<E>

    emit<K extends keyof E>(name: K, arg?: E[K]): void
}

export default IEventEmitter