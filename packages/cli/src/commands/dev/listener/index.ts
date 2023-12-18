import { Socket, io } from "socket.io-client";
import {
  OnApplicationInitial,
  OnChangesDto,
  OnFormCreateDto,
  OnFormSaveDto,
  OnInitialDto,
} from "./dto";
import { Generator } from "../generator";
import { Spinner } from "../../../utils/spinner";
import { toKebabCase } from "../../../utils";

export class Listener {
  private socket: Socket;
  private generator: Generator;
  private spinner: Spinner;
  private applicationId: string;

  constructor(url: string) {
    this.socket = io(`${url}/cli`);
    this.generator = new Generator();
    this.spinner = new Spinner(1);

    this.applicationId = "a6a83117-cfcf-4e07-acaa-45da59dd9c11";

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
    this.spinner.start("Listening for changes...");
    // Perform any actions needed when the connection is established
  }

  private onDisconnect() {
    console.log("Socket.IO connection disconnected");
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
