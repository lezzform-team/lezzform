import { LoginDto } from "./dto";
import prompts from "prompts";
import { AuthCommandConfiguration, AuthCommandEvents } from "./types";
import { Command } from "../command";
import { FileAndDirectoryUtility, Logger, handleError } from "@/utils";
import { AuthClient } from "@/clients/auth";
import { Maybe } from "@/types";

export class AuthCommand extends Command {
  private logger: Logger;
  private authClient: AuthClient;
  private fileAndDirectoryUtility: FileAndDirectoryUtility;

  constructor(config: AuthCommandConfiguration) {
    super({
      isDebugMode: config.isDebugMode,
      url: config.url,
      config: config.config,
    });
    if (config.api) this.api = config.api;

    this.logger = new Logger("AuthCommand", this.isDebugMode);
    this.authClient = new AuthClient({
      isDebugMode: this.isDebugMode,
      url: this.url,
      api: this.api,
    });
    this.fileAndDirectoryUtility = new FileAndDirectoryUtility(
      this.isDebugMode,
    );
  }

  async login(): Promise<boolean> {
    try {
      const dto = await this._getLoginCredential();
      this.logger.info("Logging in...");
      const data = await this.authClient.login(dto);

      await this.config.setAuthConfig(data);
      this.setApiToken(data.accessToken);

      this.logger.success("Logged in!");
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }

  async logout(): Promise<boolean> {
    try {
      this._configPathAuthCheck();

      const removeAuthConfig = await this.fileAndDirectoryUtility.delete({
        fileName: this.configPath.auth,
      });
      this.logger.success("Logout success!");

      return removeAuthConfig;
    } catch (error) {
      if (this.isDebugMode) this.logger.error(error);
      return false;
    }
  }

  private _configPathAuthCheck() {
    const isNotContainLezzformPath =
      !this.configPath.auth.includes(".lezzform");

    if (isNotContainLezzformPath)
      throw new Error(`Invalid path: ${this.configPath.auth}`);
  }

  async init(): Promise<boolean> {
    const event = await this._validate();

    if (event) return this._eventHandler(event);

    return true;
  }

  private async _validate(): Promise<AuthCommandEvents | null> {
    this.logger.info("Verifying authorization...");

    if (!this.config.auth) return AuthCommandEvents.Login;

    const isConfigVerified = await this._isConfigVerified();
    if (!isConfigVerified) return AuthCommandEvents.Login;

    this.logger.success("Authenticated!");

    return null;
  }

  private async _eventHandler(event: AuthCommandEvents): Promise<boolean> {
    if (event === AuthCommandEvents.Login) return this.login();

    return false;
  }

  private async _getLoginCredential(): Promise<Maybe<LoginDto>> {
    this.logger.general("== Login to LezzForm CLI ==");

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
      handleError(error);
    }
  }

  private async _isConfigVerified(): Promise<boolean> {
    try {
      if (!this.config.auth) return false;
      this.setApiToken(this.config.auth.accessToken);

      return await this.authClient.verify();
    } catch (error) {
      this.logger.error("Unauthorized");
      if (this.isDebugMode) this.logger.error(error);
      return false;
    }
  }
}
