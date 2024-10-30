import {Duration} from "./time";
import {Lyric} from "../schema";

export abstract class LyricHelper {
    /**  lyricDurationReg
     * 1、标准格式： [分钟:秒.毫秒] 歌词  [01:23.456]
     * 2、其他格式①：[分钟:秒] 歌词 [01:23]
     * 3、其他格式②：[分钟:秒:毫秒] 歌词 与标准格式相比，秒后边的点号被改成了冒号 [01:23:456]
     * */
    private static readonly LyricDurationReg = /\[(\d{2,}):(\d{2})(?:[.:](\d{1,3}))?]/;
    private static readonly LyricDurationUnits = [Duration.Minute, Duration.Second];

    private static parseDuration(minStr: string, secStr: string, msStr?: string): Duration {
        const min = parseInt(minStr, 10);
        const sec = parseInt(secStr, 10);
        const ms = msStr ? parseInt(msStr, 10) : 0;
        return Duration.add(
            Duration.fromMinutes(min),
            Duration.fromSeconds(sec),
            Duration.fromMilliseconds(ms)
        )
    }

    private static formatDuration(d: Duration): string {
        let duration = d.milliseconds
        return LyricHelper.LyricDurationUnits.map(uint => {
            const time = Math.floor(duration / uint.milliseconds).toString().padStart(2, "0")
            duration %= uint.milliseconds
            return time
        }).join(":");
    }

    private static parseLyric(lrc: string): Lyric | undefined {
        const execArr = LyricHelper.LyricDurationReg.exec(lrc)
        if (!execArr) {
            return undefined
        }
        const [, minStr, secStr, msStr] = execArr;
        const duration = LyricHelper.parseDuration(minStr, secStr, msStr);
        const content = lrc.slice(execArr[0].length).trim();
        return {
            content,
            duration,
            durationFormatted: LyricHelper.formatDuration(duration),
        }
    }

    static parseLyrics(lrcs: string): Lyric[] {
        return lrcs
            .split("\n")
            .map(LyricHelper.parseLyric)
            .filter(Boolean) as unknown as Lyric[]
    }
}