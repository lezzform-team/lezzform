import { AuthCommand } from "../auth";
import { Listener } from "./listener";

export class DevCommand {
  url: string;
  listener?: Listener;
  authCommand: AuthCommand;

  constructor(url: string) {
    this.url = url;
    this.authCommand = new AuthCommand(this.url);
  }

  async init() {
    const config = await this.authCommand.init();
    if (!config) return console.log("Failed to get config");

    console.log("Starting development server...");
    this.listener = new Listener(this.url, config);
  }
}
