import { Axios } from "axios";
import os from "os";
import fs from "fs";
import path from "path";

export class AuthCommand {
  url: string;
  api: Axios;
  configPath: string;

  constructor(url: string) {
    this.url = url;
    this.configPath = path.join(os.homedir(), ".lezzform", "config.json");
    this.api = new Axios({ baseURL: this.url });
  }

  async init() {
    if (!this._isConfigExisted()) return this.login();

    return true;
  }

  private async login() {
    console.log("login");
  }

  private async _isConfigExisted() {
    return fs.existsSync(this.configPath);
  }
}
