import { Socket, io } from "socket.io-client";
import {
  OnApplicationInitial,
  OnFormCreateDto,
  OnFormUpdateDto,
  OnSaveElementEnvironmentDto,
} from "./dto";
import { Generator } from "../generator";
import { ListenerConfiguration } from "./types";
import { ConfigClient } from "@/clients/config";
import { Logger } from "@/utils";
import { SocketClient } from "@/clients/socket";

export class Listener extends SocketClient {
  private generator: Generator;
  private applicationId: string;
  private logger: Logger;

  constructor(config: ListenerConfiguration) {
    super({
      config: config.config,
      isDebugMode: config.isDebugMode,
      url: config.url,
    });

    this.generator = new Generator({ isDebugMode: config.isDebugMode });
    this.logger = new Logger("Listener", this.isDebugMode);

    this.applicationId = this.config.project?.applicationId!;

    this.socket.on("connect", () => {
      this.onConnect();
    });

    this.socket.emit(
      "application.initial",
      { applicationId: this.applicationId, environmentType: "DEVELOPMENT" },
      (data: OnApplicationInitial) => {
        this.onApplicationInitial(data);
      }
    );

    this.socket.on(
      "form.environment.saveElement",
      (applicationId: string, data: OnSaveElementEnvironmentDto) => {
        if (applicationId !== this.applicationId) return;

        this.onSaveElementEnvironment(data);
      }
    );

    this.socket.on(
      "form.create",
      (applicationId: string, data: OnFormCreateDto) => {
        if (applicationId !== this.applicationId) return;

        this.onFormCreate(data);
      }
    );

    this.socket.on(
      "form.update",
      (applicationId: string, data: OnFormUpdateDto) => {
        if (applicationId !== this.applicationId) return;

        this.onFormUpdate(data);
      }
    );

    this.socket.on("disconnect", () => {
      this.onDisconnect();
    });

    this.socket.on("error", (error: Error) => {
      this.onError(error);
    });
  }

  private onConnect() {
    this.logger.success("Connected to server ✅");
    // Perform any actions needed when the connection is established
  }

  private onDisconnect() {
    this.logger.warn("Disconnected ❌");
    // Perform any cleanup or reconnection logic here
  }

  private onError(error: Error) {
    this.logger.error("Socket.IO error:", error.message);
    // Handle errors
  }

  private async onApplicationInitial(data: OnApplicationInitial) {
    this.logger.info(
      "Generating component from latest data in Development env..."
    );
    await Promise.all(
      data.forms.map(async (item) => {
        return await this.generator.form({
          fileName: item.form.fileName,
          code: item.code,
        });
      })
    );
    this.logger.success("Generated successfully!");
  }

  private onFormCreate(data: OnFormCreateDto) {
    this.logger.info("Form created ▶️");
    this.generator.form({
      code: data.code,
      fileName: data.form.fileName,
    });
  }

  private onSaveElementEnvironment(data: OnSaveElementEnvironmentDto) {
    this.logger.info("Form changes ⬇️");
    this.generator.form({
      code: data.code,
      fileName: data.form.fileName,
    });
  }

  private onFormUpdate(data: OnFormUpdateDto) {
    this.logger.info("Form updated");

    if (data.before.fileName !== data.after.fileName) {
      this.generator.rename(
        `${data.before.fileName}.tsx`,
        `${data.after.fileName}.tsx`
      );
    }
  }

  closeConnection() {
    this.socket.disconnect();
  }
}
