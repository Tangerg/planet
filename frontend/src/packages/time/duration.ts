export class Duration {
    private readonly _milliseconds: number

    constructor(milliseconds: number = 0) {
        this._milliseconds = Math.max(milliseconds, 0)
    }

    static Millisecond = new Duration(1)
    static Second = new Duration(1000 * Duration.Millisecond.milliseconds)
    static Minute = new Duration(60 * Duration.Second.milliseconds)
    static Hour = new Duration(60 * Duration.Minute.milliseconds)


    static fromMilliseconds(duration: number) {
        return new Duration(duration * Duration.Millisecond.milliseconds)
    }

    static fromSeconds(duration: number) {
        return new Duration(duration * Duration.Second.milliseconds)
    }

    static fromMinutes(duration: number) {
        return new Duration(duration * Duration.Minute.milliseconds)
    }

    static fromHours(duration: number) {
        return new Duration(duration * Duration.Hour.milliseconds)
    }

    static add(...ds: Duration[]): Duration {
        let ms = 0
        ds.forEach(d => {
            ms += d.milliseconds
        })
        return new Duration(ms)
    }

    get milliseconds(): number {
        return this._milliseconds
    }

    get seconds(): number {
        return this.milliseconds / Duration.Second.milliseconds;
    }

    get minutes(): number {
        return this.milliseconds / Duration.Minute.milliseconds;
    }

    get hours(): number {
        return this.milliseconds / Duration.Hour.milliseconds;
    }

}
