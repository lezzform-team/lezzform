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

export class Listener {
  private socket: Socket;
  private generator: Generator;
  private applicationId: string;
  private isDebugMode: boolean;
  private config: ConfigClient;
  private logger: Logger;

  constructor(config: ListenerConfiguration) {
    this.isDebugMode = config.isDebugMode;
    this.config = config.config;

    this.socket = io(`${config.url}/cli`, {
      extraHeaders: {
        Authorization: `Bearer ${this.config.auth?.accessToken!}`,
        ["x-auth-source"]: "cli",
      },
      auth: {
        token: `Bearer ${this.config.auth?.accessToken!}`,
      },
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

  private onApplicationInitial(data: OnApplicationInitial) {
    data.forms.forEach((item) => {
      this.generator.form({
        fileName: item.form.fileName,
        code: item.code,
      });
    });
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
