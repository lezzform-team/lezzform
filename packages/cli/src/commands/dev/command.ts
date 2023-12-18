import { AuthCommand } from "../auth/command";
import { Listener } from "./listener";

export class DevCommand {
  url: string;
  listener: Listener;
  authCommand: AuthCommand;

  constructor(url: string) {
    this.url = url;
    this.authCommand = new AuthCommand(this.url);
    this.listener = new Listener(this.url);
  }

  async init() {
    console.log("Starting development server...");
  }
}
