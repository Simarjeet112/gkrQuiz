// Global Audio Manager for Wonderwall (User uploaded Oasis track)
// File located at /public/wonderwall.mp3

class WonderwallManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.7;
  private listeners: Set<(playing: boolean, volume: number) => void> = new Set();

  private init() {
    if (this.audio) return;
    try {
      this.audio = new Audio('/wonderwall.mp3');
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    } catch (e) {
      console.warn('Wonderwall audio initialization failed:', e);
    }
  }

  public subscribe(cb: (playing: boolean, volume: number) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying, this.volume);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.volume));
  }

  public async play(): Promise<void> {
    this.init();
    if (!this.audio) return;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
    } catch (err) {
      console.warn('Autoplay restricted by browser, user action required:', err);
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  public getStatus() {
    return { isPlaying: this.isPlaying, volume: this.volume };
  }
}

export const wonderwallAudio = new WonderwallManager();
