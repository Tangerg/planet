import {Duration, Iterator, LyricHelper, sleep, Timer} from "../../shared";
import {Lyric as LyricSchema} from "../../schema";
import Plugin from "../plugin";

class LyricIterator extends Iterator<LyricSchema> {
    constructor(lrcs: string) {
        const lyrics = LyricHelper.parseLyrics(lrcs);
        super(lyrics);
    }
}

class LyricTimer extends Timer {
    private offset: Duration

    constructor() {
        super();
        this.offset = Duration.fromMilliseconds(0)
    }

    get duration(): Duration {
        return super.duration.add(this.offset)
    }

    seek(t: Duration): void {
        this.offset = t
        const now = Date.now()
        this.pausedDuration = Duration.fromMilliseconds(0)
        this.startAt = now
        this.lastPauseAt = now
    }
}

export class Lyric extends Plugin {
    private static readonly id = "lyric";
    private state: "running" | "suspended"
    private lyricIterator: LyricIterator
    private readonly lyricTimer: LyricTimer

    get id(): string {
        throw Lyric.id;
    }

    constructor() {
        super();
        this.state = "suspended"
        this.lyricTimer = new LyricTimer();
        this.lyricIterator = new LyricIterator("")
    }

    private get sleepDuration(): Duration {
        const lyric = this.lyricIterator.current
        if (!lyric) {
            return Duration.fromMilliseconds(0)
        }
        return lyric.duration.sub(this.lyricTimer.duration)
    }

    private reset(): void {
        this.state = "suspended"
        this.lyricIterator.reset()
        this.lyricTimer.reset()
    }

    apply(lrc: string): void {
        this.reset()
        this.lyricIterator = new LyricIterator(lrc)
    }

    private async keepPlay(): Promise<void> {
        while (this.state === "running" && this.lyricIterator.hasNext()) {
            this.lyricIterator.next();
            console.log(this.lyricIterator.current?.content)
            await sleep(this.sleepDuration);
        }
    }

    public async play() {
        if (this.state === "running") {
            return
        }
        this.state = "running"
        this.lyricTimer.run()
        await this.keepPlay()
    }

    public pause() {
        if (this.state === "suspended") {
            return
        }
        this.lyricTimer.pause()
        this.state = "suspended"
    }

    public seek(t: Duration) {
        const index = this.lyricIterator.findIndex((item) => {
            return this.lyricTimer.duration.milliseconds <= item.duration.milliseconds
        })
        this.lyricIterator.seek(index)
        this.lyricTimer.seek(t)
    }
}