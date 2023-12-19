import { AxiosInstance } from "axios";
import { AuthCommand } from "../auth";
import { Listener } from "./listener";
import path from "path";
import fs from "fs/promises";
import { api } from "@/lib";
import prompts from "prompts";
import { ApplicationEntity } from "@/types";
import { ProjectConfigEntity } from "./entities";
import ora from "ora";
import chalk from "chalk";
import * as prettier from "prettier";

export class DevCommand {
  url: string;
  listener?: Listener;
  authCommand: AuthCommand;
  configRootDirectoryPath: string;
  configPath: string;
  api: AxiosInstance = api;

  constructor(url: string) {
    this.url = url;
    this.authCommand = new AuthCommand(this.url);
    this.configRootDirectoryPath = path.join(process.cwd(), "lezzform");
    this.configPath = path.join(this.configRootDirectoryPath, "config.json");
  }

  async init() {
    const authConfig = await this.authCommand.init();
    if (!authConfig) return console.log("Failed to get authConfig");
    this._setApiToken(authConfig.accessToken);

    const projectConfig = await this.getProjectConfig();
    if (!projectConfig) return console.log("Failed to get projectConfig");

    console.log(chalk.greenBright("Starting development server..."));
    this.listener = new Listener({ url: this.url, authConfig, projectConfig });
  }

  private async getProjectConfig(): Promise<ProjectConfigEntity | null> {
    const isConfigNotExisted = await this._isConfigNotExisted();
    if (!isConfigNotExisted) return await this._getConfig();

    const appSelector = await this.applicationSelector();
    if (!appSelector?.applicationId) return null;

    const config: ProjectConfigEntity = {
      applicationId: appSelector.applicationId,
    };
    await this._generateConfigFile(JSON.stringify(config));

    return config;
  }

  private async applicationSelector() {
    const spinner = ora("Loading your applications...").start();

    try {
      const { data } = await this.api.get<ApplicationEntity[]>("/applications");
      spinner.succeed("Applications loaded!");

      const questions: prompts.PromptObject<string> = {
        type: "select",
        name: "applicationId",
        message: "Select preferred application 👇",
        choices: data.map((application) => ({
          title: application.name,
          value: application.id,
        })),
      };

      const answers = (await prompts(questions)) as { applicationId: string };
      const applicationName = data.find(
        (application) => application.id === answers.applicationId,
      );

      console.log(
        `👉 Selected application: ${chalk.blueBright(applicationName?.name)}`,
      );

      return answers;
    } catch (error) {
      console.log("_initApplicationSelector err: ", error);
      spinner.stop();
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

  private async _getConfig(): Promise<ProjectConfigEntity | null> {
    try {
      const strConfig: string = await fs.readFile(this.configPath, "utf-8");
      const config: ProjectConfigEntity = JSON.parse(strConfig);

      return config;
    } catch (error) {
      console.error("_getConfig err: ", error);
      return null;
    }
  }

  private _setApiToken(accessToken: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
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
}
