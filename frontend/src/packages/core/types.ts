import {Options} from "./options";
import {EventMap} from "./events";
import {IDisposeable, IIDable} from "../types";
import {ILogger} from "../logger";
import IEventEmitter from "../event/types";

export interface IContext {
    get options(): Options;

    get audioElement(): HTMLAudioElement;

    get audioContext(): AudioContext;

    get hooks(): IEventEmitter<EventMap>

    get logger(): ILogger;
}

export interface IPlugin extends IIDable, IDisposeable {
    beforeInstall(): void

    install(ctx: IContext): void

    afterInstall(): void

    beforeUninstall(): void

    uninstall(): void

    afterUninstall(): void
}

export interface IPlanet {
    get context(): IContext
}