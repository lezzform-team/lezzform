import { Axios } from "axios";
import os from "os";
import fs from "fs/promises";
import path from "path";
import { LoginDto } from "./dto";
import { AuthConfigEntity, LoginEntity } from "./entities";
import { api } from "@/lib";
import prompts from "prompts";
import * as prettier from "prettier";

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

  async init(): Promise<AuthConfigEntity | null> {
    if (await this._isConfigNotExisted()) return this.login();
    if (await this._isConfigNotVerified()) return this.login();

    return await this._getConfig();
  }

  async login(): Promise<LoginEntity | null> {
    try {
      const dto = await this._initLogin();

      console.log("Logging in...");
      const { data } = await this.api.post<LoginEntity>("/auth/login/cli", dto);
      await this._generateConfigFile(JSON.stringify(data));

      this._setApiToken(data.accessToken);

      console.log("Logged in!");

      return data;
    } catch (error) {
      console.error("login err: ", error);
      return null;
    }
  }

  private async _initLogin(): Promise<LoginDto | null> {
    console.log("== Login to LezzForm CLI ==");

    try {
      const questions: prompts.PromptObject<string>[] = [
        { type: "text", name: "email", message: "Input your email: " },
        {
          type: "password",
          name: "password",
          message: "Input your password: ",
        },
      ];

      const answers = (await prompts(questions)) as LoginDto;

      return answers;
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
      const formatted = await prettier.format(config, { parser: "json" });
      await fs.mkdir(this.configRootDirectoryPath, { recursive: true });
      await fs.writeFile(this.configPath, formatted);
    } catch (error) {
      console.error("_generateConfigFile err: ", error);
    }
  }

  private async _isConfigNotVerified() {
    try {
      const config = await this._getConfig();
      if (!config) return true;

      this._setApiToken(config.accessToken);

      const { data } = await this.api.get("/auth/verify");
      return !data;
    } catch (error) {
      console.log("_isConfigNotVerified err: ", error);
      return true;
    }
  }

  private async _getConfig(): Promise<AuthConfigEntity | null> {
    try {
      const strConfig: string = await fs.readFile(this.configPath, "utf-8");
      const config: AuthConfigEntity = JSON.parse(strConfig);

      return config;
    } catch (error) {
      console.error("_getConfig err: ", error);
      return null;
    }
  }

  private _setApiToken(accessToken: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
