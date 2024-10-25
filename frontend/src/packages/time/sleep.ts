import {Duration} from "./duration";

export function sleep(duration: Duration): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, duration.milliseconds);
    });
}

export function sleepMilliseconds(ms: number) {
    return sleep(Duration.fromMilliseconds(ms))
}