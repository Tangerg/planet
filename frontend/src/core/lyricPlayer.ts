import type { Lyric } from '../types/lyric';
import { PlayStatus } from '../const';

export class LyricPlayer {
  private state: PlayStatus = PlayStatus.Pause;
  private readonly lyrics: Lyric[];
  private timer: number = 0;
  private startTime: number = 0;

  constructor(lyrics: Lyric[]) {
    this.lyrics = lyrics;
  }

  private _findIndex(seek: number): number {
    for (let i = 0; i < this.lyrics.length; i++) {
      if (seek <= this.lyrics[i].time) {
        return i;
      }
    }
    return this.lyrics.length - 1;
  }

  private _keepPlay(index: number) {
    if (index === this.lyrics.length || this.state === PlayStatus.Pause) {
      clearTimeout(this.timer);
      return;
    }
    const delay = this.lyrics[index].time - (new Date().getTime() - this.startTime);
    console.log(this.lyrics[index].lyric);
    console.log(this.lyrics[index].tLyric);
    // @ts-ignore
    this.timer = setTimeout(() => {
      if (index < this.lyrics.length) {
        this._keepPlay(index + 1);
      }
    }, delay) as number;
  }

  public play(seek: number = 0) {
    if (!this.lyrics.length) {
      return;
    }
    clearTimeout(this.timer);
    this.startTime = new Date().getTime() - seek;
    this.state = PlayStatus.Play;
    this._keepPlay(this._findIndex(seek));
  }

  public pause() {
    this.state = PlayStatus.Pause;
    clearTimeout(this.timer);
  }

  public seek(seek: number) {
    this.play(seek);
  }

  public togglePlay(seek: number = 0) {
    if (this.state === PlayStatus.Play) {
      this.pause();
    } else {
      this.play(seek);
    }
  }
}
