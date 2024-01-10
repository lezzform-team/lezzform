import { AuthCommand } from "../auth";
import { Listener } from "./listener";
import prompts from "prompts";
import chalk from "chalk";
import { DevCommandConfiguration, DevCommandEvents } from "./types";
import { Command } from "../command";
import { FileAndDirectoryUtility, Logger, handleError } from "@/utils";
import { ApplicationClient } from "@/clients/application";
import { selectApplicationSchema } from "./validators";

export class DevCommand extends Command {
  private logger: Logger;
  private listener?: Listener;
  private authCommand: AuthCommand;
  private fileAndDirectoryUtility: FileAndDirectoryUtility;
  private applicationClient: ApplicationClient;

  constructor(config: DevCommandConfiguration) {
    super({
      isDebugMode: config.isDebugMode,
      url: config.url,
      config: config.config,
    });
    this.logger = new Logger("DevCommand", this.isDebugMode);

    this.authCommand = new AuthCommand({
      api: this.api,
      isDebugMode: this.isDebugMode,
      url: this.url,
      config: this.config,
    });
    this.fileAndDirectoryUtility = new FileAndDirectoryUtility(
      this.isDebugMode
    );
    this.applicationClient = new ApplicationClient({
      api: this.api,
      isDebugMode: this.isDebugMode,
      url: this.url,
    });

    this._init();
  }

  private async _init() {
    try {
      const isAuthInitialized = await this.authCommand.init();
      if (!isAuthInitialized)
        throw new Error("Failed to initialize auth service");

      const event = await this._validate();
      if (event) await this._eventHandler(event);

      this.logger.info("Starting development server...");
      this.listener = new Listener({
        config: this.config,
        url: this.url,
        isDebugMode: this.isDebugMode,
      });
    } catch (error) {
      handleError(error);
    }
  }

  private async _validate(): Promise<DevCommandEvents | null> {
    const projectConfig = this.config.project;
    if (!projectConfig) return DevCommandEvents.SelectApplication;

    return null;
  }

  private async _eventHandler(event: DevCommandEvents) {
    if (event === DevCommandEvents.SelectApplication)
      return this._selectApplication();
  }

  private async _selectApplication(): Promise<boolean> {
    try {
      this.logger.info("Loading your applications...");
      const data = await this.applicationClient.findAll();
      this.logger.success("Applications loaded!");

      const questions: prompts.PromptObject<string> = {
        type: "select",
        name: "applicationId",
        message: "Select preferred application 👇",
        choices: data.map((application) => ({
          title: application.name,
          value: application.id,
        })),
      };
      const answers = await selectApplicationSchema.parse(
        await prompts(questions)
      );
      const applicationName = data.find(
        (application) => application.id === answers.applicationId
      );

      this.logger.general(
        `👉 Selected application: ${chalk.blueBright(applicationName?.name)}`
      );

      this.config.setProjectConfig({ applicationId: answers.applicationId });

      return true;
    } catch (error) {
      handleError(error);

      return false;
    }
  }
}
