import { Socket, io } from "socket.io-client";
import { OnApplicationInitial, OnFormCreateDto, OnFormSaveDto } from "./dto";
import { AuthConfigEntity } from "@/commands/auth/entities";
import { Generator } from "../generator";
import { toKebabCase } from "@/utils";
import { ProjectConfigEntity } from "../entities";
import ora from "ora";
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
      },
    );

    this.socket.on(
      "form.save",
      (applicationId: string, data: OnFormSaveDto) => {
        console.log("form.save", { applicationId });
        if (applicationId !== this.applicationId) return;

        this.onFormSave(data);
      },
    );

    this.socket.on(
      "form.create",
      (applicationId: string, data: OnFormCreateDto) => {
        if (applicationId !== this.applicationId) return;

        this.onFormCreate(data);
      },
    );

    this.socket.on("disconnect", () => {
      this.onDisconnect();
    });

    this.socket.on("error", (error: Error) => {
      this.onError(error);
    });
  }

  private onConnect() {
    // console.log("Socket.IO connection established");
    ora("Listening for changes...").start();

    // Perform any actions needed when the connection is established
  }

  private onDisconnect() {
    console.log(chalk.redBright("Disconnected"));
    // Perform any cleanup or reconnection logic here
  }

  private onError(error: Error) {
    console.error("Socket.IO error:", error.message);
    // Handle errors
  }

  private onApplicationInitial(data: OnApplicationInitial) {
    data.forms.forEach((item) => {
      this.generator.form({
        name: toKebabCase(item.form.name),
        code: item.code,
      });
    });
  }

  private onFormCreate(data: OnFormCreateDto) {
    this.generator.form({ code: data.code, name: toKebabCase(data.form.name) });
  }

  private onFormSave(data: OnFormSaveDto) {
    this.generator.form({ code: data.code, name: toKebabCase(data.form.name) });
  }

  closeConnection() {
    this.socket.disconnect();
  }
}
