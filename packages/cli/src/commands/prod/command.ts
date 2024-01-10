import { Logger, handleError } from "@/utils";
import { Command } from "../command";
import { ProdCommandConfiguration, ProdCommandEvents } from "./types";
import { AuthCommand } from "../auth";
import { ApplicationClient } from "@/clients/application";
import { SocketClient } from "@/clients/socket";
import { OnApplicationInitial } from "../dev/listener/dto";
import { Generator } from "../dev/generator";

export class ProdCommand extends Command {
  private logger: Logger;
  private authCommand: AuthCommand;
  private applicationClient: ApplicationClient;
  private socketClient: SocketClient;
  private generator: Generator;

  constructor(config: ProdCommandConfiguration) {
    super({
      config: config.config,
      isDebugMode: config.isDebugMode,
      url: config.url,
    });
    this.logger = new Logger("ProdCommand", this.isDebugMode);

    this.authCommand = new AuthCommand({
      api: this.api,
      isDebugMode: this.isDebugMode,
      url: this.url,
      config: this.config,
    });

    this.applicationClient = new ApplicationClient({
      api: this.api,
      isDebugMode: this.isDebugMode,
      url: this.url,
    });

    this.generator = new Generator({ isDebugMode: this.isDebugMode });

    this.socketClient = new SocketClient({
      config: this.config,
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

      this.socketClient.socket.emit(
        "application.initial",
        {
          applicationId: this.config.project?.applicationId,
          environmentType: "PRODUCTION",
        },
        (data: OnApplicationInitial) => {
          this._onApplicationInitial(data);
          this.socketClient.socket.disconnect();
        }
      );
    } catch (error) {
      handleError(error);
    }
  }

  private async _validate(): Promise<ProdCommandEvents | null> {
    const projectConfig = this.config.project;
    if (!projectConfig) return ProdCommandEvents.SelectApplication;
    if (!projectConfig.applicationId)
      return ProdCommandEvents.SelectApplication;

    return null;
  }

  private async _eventHandler(event: ProdCommandEvents) {
    if (event === ProdCommandEvents.SelectApplication)
      throw new Error("Application not available");
  }

  private async _onApplicationInitial(data: OnApplicationInitial) {
    this.logger.info(
      "Generating component from latest data in Production env..."
    );
    await Promise.all(
      data.forms.map(async (item) => {
        return this.generator.form({
          fileName: item.form.fileName,
          code: item.code,
        });
      })
    );
    this.logger.success("Generated successfully!");
  }
}
