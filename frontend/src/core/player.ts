import type { Planet } from './planet';

class Player implements Planet {
  private audio: HTMLMediaElement | null = null;
  private playIndex: number = 0;
  private playSong: any;
  private playlist: any[] = [];
  private duration: number = 0;
  private playedDuration: number = 0;

  public attachMedia(media: HTMLAudioElement) {
    this.audio = media;
  }

  public next() {
    this.pause();
    this.playIndex = this.playIndex + 1;
    this.playSong = this.playlist[this.playIndex];
    this.play();
  }

  public prev() {}

  public addSongToList(): void {}

  public setPlaylist(list: any[]) {
    this.playlist = list;
  }

  public clearPlaylist() {}

  public play() {
    this.audio?.play();
  }

  public pause() {
    this.audio?.pause();
  }

  public fastSeek(time: number) {
    this.audio?.fastSeek(time);
  }
}

export default Player;
