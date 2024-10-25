import EventMap from "../core/events";
import Options from "../core/options";
import {IContext} from "../core/types";
import IEventEmitter from "../event/types";
import EventEmitter from "../event/event_emitter";
import {ILogger} from "../logger";

export class Context implements IContext {
    private readonly opts: Options
    private readonly _logger: ILogger;
    private readonly _audioElement: HTMLAudioElement;
    private readonly _audioContext: AudioContext;
    private readonly eventEmitter: EventEmitter<EventMap>;

    constructor(options: Options, logger: ILogger) {
        this.opts = options;
        this._logger = logger;
        this._audioElement = new Audio();
        this._audioContext = new AudioContext();
        this.eventEmitter = new EventEmitter<EventMap>();
    }

    get logger(): ILogger {
        return this._logger;
    }

    get options(): Options {
        return this.opts
    }

    get audioElement(): HTMLAudioElement {
        return this._audioElement;
    }

    get audioContext(): AudioContext {
        return this._audioContext;
    }

    get hooks(): IEventEmitter<EventMap> {
        return this.eventEmitter
    }
}

export default Context;