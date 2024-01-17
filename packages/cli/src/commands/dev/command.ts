import { AuthCommand } from "../auth";
import { Listener } from "./listener";
import prompts from "prompts";
import { DevCommandConfiguration, DevCommandEvents } from "./types";
import { Command } from "../command";
import { FileAndDirectoryUtility, Logger, handleError } from "@/utils";
import { ApplicationClient } from "@/clients/application";
import { configInitializationSchema } from "./validators";
import { ProjectPlatform } from "@/clients/config/entities";

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
      this.isDebugMode,
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
    if (!projectConfig) return DevCommandEvents.ConfigInitialization;

    return null;
  }

  private async _eventHandler(event: DevCommandEvents) {
    if (event === DevCommandEvents.ConfigInitialization)
      return this._configInitialization();
  }

  private async _configInitialization(): Promise<boolean> {
    try {
      const selectApplication = await this._selectApplication();
      const selectPlatform = await this._selectPlatform();

      const questions: prompts.PromptObject<string>[] = [
        selectApplication,
        selectPlatform,
      ];
      const answers = await configInitializationSchema.parse(
        await prompts(questions),
      );

      this.config.setProjectConfig({
        applicationId: answers.applicationId,
        platform: answers.platform,
      });

      return true;
    } catch (error) {
      handleError(error);

      return false;
    }
  }

  private async _selectApplication(): Promise<prompts.PromptObject<string>> {
    this.logger.info("Loading your applications...");
    const data = await this.applicationClient.findAll();
    this.logger.success("Applications loaded!");

    const question: prompts.PromptObject<string> = {
      type: "select",
      name: "applicationId",
      message: "Select preferred application 👇",
      choices: data.map((application) => ({
        title: application.name,
        value: application.id,
      })),
    };

    return question;
  }

  private async _selectPlatform(): Promise<prompts.PromptObject<string>> {
    const question: prompts.PromptObject<string> = {
      type: "select",
      name: "platform",
      message: "Select your platform 👇",
      choices: [
        {
          title: "Web 🖥️",
          value: ProjectPlatform.Web,
          description: "Project used in web browser using React or NextJS",
        },
        {
          title: "Mobile 📱",
          value: ProjectPlatform.Mobile,
          description: "Project used in mobile platform using React Native",
        },
      ],
    };

    return question;
  }
}
