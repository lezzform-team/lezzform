import { Socket, io } from "socket.io-client";
import {
  OnApplicationInitial,
  OnFormCreateDto,
  OnFormSaveDto,
  OnFormUpdateDto,
} from "./dto";
import { AuthConfigEntity } from "@/commands/auth/entities";
import { Generator } from "../generator";
import { ProjectConfigEntity } from "../entities";
import chalk from "chalk";

export class Listener {
  private socket: Socket;
  private generator: Generator;
  private applicationId: string;
  private authConfig: AuthConfigEntity;

  constructor({
    url,
    authConfig,
    projectConfig,
  }: {
    url: string;
    authConfig: AuthConfigEntity;
    projectConfig: ProjectConfigEntity;
  }) {
    this.authConfig = authConfig;

    this.socket = io(`${url}/cli`, {
      extraHeaders: {
        Authorization: `Bearer ${authConfig.accessToken}`,
        ["x-auth-source"]: "cli",
      },
      auth: {
        token: `Bearer ${authConfig.accessToken}`,
      },
    });
    this.generator = new Generator();

    this.applicationId = projectConfig.applicationId;

    this.socket.on("connect", () => {
      this.onConnect();
    });

    this.socket.emit(
      "application.initial",
      { applicationId: this.applicationId },
      (data: OnApplicationInitial) => {
        this.onApplicationInitial(data);
      }
    );

    this.socket.on(
      "form.save",
      (applicationId: string, data: OnFormSaveDto) => {
        if (applicationId !== this.applicationId) return;

        this.onFormSave(data);
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
    console.log(chalk.greenBright("Connected to server ✅"));
    // console.log("Socket.IO connection established");
    // Perform any actions needed when the connection is established
  }

  private onDisconnect() {
    console.log(chalk.redBright("Disconnected ❌"));
    // Perform any cleanup or reconnection logic here
  }

  private onError(error: Error) {
    console.error("Socket.IO error:", error.message);
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
    console.log(chalk.green("Form created ▶️"));
    this.generator.form({
      code: data.code,
      fileName: data.form.fileName,
    });
  }

  private onFormSave(data: OnFormSaveDto) {
    console.log(chalk.blue("Form changes ⬇️"));
    this.generator.form({
      code: data.code,
      fileName: data.form.fileName,
    });
  }

  private onFormUpdate(data: OnFormUpdateDto) {
    console.log(chalk.blue("Form updated"));

    if (data.before.fileName !== data.after.fileName) {
      this.generator.rename(data.before.fileName, data.after.fileName);
    }
  }

  closeConnection() {
    this.socket.disconnect();
  }
}
