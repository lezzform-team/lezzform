import axios, { Axios } from "axios";
import os from "os";
import fs from "fs/promises";
import path from "path";
import * as readlineSync from "readline-sync";
import { LoginDto } from "./dto";
import { ConfigEntity, LoginEntity } from "./entities";
import { api } from "../../lib";

export class AuthCommand {
  url: string;
  api: Axios = api;
  configRootDirectoryPath: string;
  configPath: string;

  constructor(url: string) {
    this.url = url;
    this.configRootDirectoryPath = path.join(os.homedir(), ".lezzform");
    this.configPath = path.join(this.configRootDirectoryPath, "config.json");
  }

  async init() {
    if (await this._isConfigNotExisted()) return this.login();
    if (await this._isConfigNotVerified()) return this.login();

    return true;
  }

  async login(): Promise<LoginEntity | null> {
    try {
      console.log("== Login to LezzForm CLI ==");

      const dto = await this._initLogin();
      const { data } = await this.api.post<LoginEntity>("/auth/login/cli", dto);
      await this._generateConfigFile(JSON.stringify(data));

      this._setApiToken(data.accessToken);

      console.log("== Logged in successfully ==");

      return data;
    } catch (error) {
      console.error("login err: ", error);
      return null;
    }
  }

  private async _initLogin(): Promise<LoginDto | null> {
    try {
      const email: string = await readlineSync.questionEMail("Email: ");
      const password: string = await readlineSync.question("Password: ", {
        hideEchoBack: true,
      });

      return { email, password };
    } catch (error) {
      console.error("_initLogin err: ", error);
      return null;
    }
  }

  private async _isConfigNotExisted() {
    try {
      await fs.access(this.configPath);
      return false;
    } catch (error) {
      return true;
    }
  }

  private async _generateConfigFile(config: string) {
    try {
      await fs.mkdir(this.configRootDirectoryPath, { recursive: true });
      await fs.writeFile(this.configPath, config);
    } catch (error) {
      console.error("_generateConfigFile err: ", error);
    }
  }

  private async _isConfigNotVerified() {
    try {
      const strConfig: string = await fs.readFile(this.configPath, "utf-8");
      const config: ConfigEntity = JSON.parse(strConfig);

      this._setApiToken(config.accessToken);

      const { data } = await this.api.get("/auth/verify");

      return !data;
    } catch (error) {
      console.log("_isConfigNotVerified err: ", error);
      return true;
    }
  }

  private _setApiToken(accessToken: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
