import { ConfigPath, FileAndDirectoryUtility, handleError } from "@/utils";
import { AuthConfigEntity, ProjectConfigEntity } from "./entities";
import { ConfigClientConfiguration } from "./types";
import * as prettier from "prettier";

export class ConfigClient {
  auth: AuthConfigEntity | null = null;
  project: ProjectConfigEntity | null = null;

  private fileAndDirectoryUtility: FileAndDirectoryUtility;

  private configPath: ConfigPath;
  private isDebugMode: boolean;

  constructor(config: ConfigClientConfiguration) {
    this.isDebugMode = config.isDebugMode;
    this.configPath = new ConfigPath({ isDebugMode: this.isDebugMode });
    this.fileAndDirectoryUtility = new FileAndDirectoryUtility(
      this.isDebugMode
    );
  }

  async init() {
    await this._getAuthConfig();
    await this._getProjectConfig();
  }

  async setAuthConfig(config: AuthConfigEntity): Promise<boolean> {
    try {
      this.auth = config;

      const formatted = await prettier.format(JSON.stringify(config), {
        parser: "json",
      });

      return await this.fileAndDirectoryUtility.create(
        { fileName: this.configPath.auth },
        formatted
      );
    } catch (error) {
      handleError(error);
      return false;
    }
  }

  async setProjectConfig(config: ProjectConfigEntity): Promise<boolean> {
    try {
      this.project = config;

      const formatted = await prettier.format(JSON.stringify(config), {
        parser: "json",
      });

      return await this.fileAndDirectoryUtility.create(
        { fileName: this.configPath.project },
        formatted
      );
    } catch (error) {
      handleError(error);
      return false;
    }
  }

  private async _getProjectConfig() {
    const projectConfig = await this.fileAndDirectoryUtility.read({
      fileName: this.configPath.project,
    });
    if (!projectConfig) {
      this.project = null;
      return;
    }

    const config = JSON.parse(projectConfig) as ProjectConfigEntity;
    this.project = config;
  }

  private async _getAuthConfig() {
    const authConfig = await this.fileAndDirectoryUtility.read({
      fileName: this.configPath.auth,
    });
    if (!authConfig) {
      this.auth = null;
      return;
    }

    const config = JSON.parse(authConfig) as AuthConfigEntity;
    this.auth = config;
  }
}
