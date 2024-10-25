import {ILogger} from "./types";

export class ConsoleLogger implements ILogger {
    log(msg: string): void {
        console.log(msg);
    }

    debug(msg: string): void {
        console.debug(msg);
    }

    info(msg: string): void {
        console.info(msg);
    }

    warn(msg: string): void {
        console.warn(msg)
    }

    error(msg: string): void {
        console.error(msg);
    }
}