import {Duration} from "./duration";

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
            this.pausedDuration = Duration.add(this.pausedDuration, Duration.fromMilliseconds(now - this.lastPauseAt))
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