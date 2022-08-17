export interface Planet {
  attachMedia(media: HTMLAudioElement): void;

  next(): void;

  prev(): void;

  setPlaylist(list: any[]): void;

  addSongToList(): void;

  clearPlaylist(): void;

  play(): void;

  pause(): void;

  fastSeek(time: number): void;
}
