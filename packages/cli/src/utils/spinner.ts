import spin from "cli-spinners";

export class Spinner {
  private frameIndex: number = 0;
  private interval: NodeJS.Timeout | null = null;
  private message: string = "";
  private stopTimeout: number = 0;

  constructor(stopTimeout = 0) {
    this.stopTimeout = stopTimeout;
  }

  start(message?: string) {
    if (message) this.message = message;

    this.interval = setInterval(() => {
      this.render();
    }, spin.dots.interval);
  }

  stop() {
    setTimeout(() => {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.message = "";
      }
    }, this.stopTimeout);
  }

  private render() {
    process.stdout.write(
      `\r${spin.dots.frames[this.frameIndex]} ${this.message}`,
    );
    this.frameIndex = (this.frameIndex + 1) % spin.dots.frames.length;
  }
}
