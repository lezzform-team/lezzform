import { Listener } from "./listener";

export class DevCommand {
  url: string = "http://localhost:3001/elements";
  listener: Listener;

  constructor() {
    this.listener = new Listener(this.url);
  }

  init() {
    console.log("Starting development server...");
  }
}
