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

    static add(...ds: Duration[]): Duration {
        let ms = 0
        ds.forEach(d => {
            ms += d.milliseconds
        })
        return new Duration(ms)
    }


    add(...ds: Duration[]): Duration {
        return Duration.add(this, ...ds)
    }

    sub(...ds: Duration[]): Duration {
        let ms = this.milliseconds
        ds.forEach(d => {
            ms -= d.milliseconds
        })
        return new Duration((ms))
    }
}

export class Timer {
    protected state: "running" | "suspended" = "suspended"
    protected startAt: number = 0
    protected lastPauseAt: number = 0
    protected pausedDuration: Duration = new Duration()

    get isRunning(): boolean {
        return this.state === "running";
    }

    get duration(): Duration {
        const endAt = this.isRunning ? Date.now() : this.lastPauseAt
        return Duration.fromMilliseconds(endAt - this.startAt - this.pausedDuration.milliseconds)
    }

    run(): void {
        if (this.isRunning) {
            return
        }
        const now = Date.now()
        if (this.startAt === 0) {
            this.startAt = now
        }
        if (this.lastPauseAt !== 0) {
            this.pausedDuration = this.pausedDuration.add(
                Duration.fromMilliseconds(now - this.lastPauseAt)
            )
        }
        this.state = "running"
    }

    pause(): void {
        if (!this.isRunning) {
            return
        }
        this.lastPauseAt = Date.now()
        this.state = "suspended"
    }

    reset(): void {
        this.state = "suspended"
        this.startAt = 0
        this.lastPauseAt = 0
        this.pausedDuration = new Duration()
    }
}


export function sleep(duration: Duration): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, duration.milliseconds);
    });
}