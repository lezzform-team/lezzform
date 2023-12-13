import { Socket, io } from "socket.io-client";
import { OnChangesDto, OnInitialDto } from "./dto";
import { Generator } from "../generator";
import { Spinner } from "../../../utils/spinner";

export class Listener {
  private socket: Socket;
  private generator: Generator;
  private spinner: Spinner;

  constructor(url: string) {
    this.socket = io(url);
    this.generator = new Generator();
    this.spinner = new Spinner(1);

    this.socket.on("connect", () => {
      this.onConnect();
    });

    this.socket.on("element.changes", (data: OnChangesDto) => {
      this.onChanges(data);
    });

    this.socket.on("disconnect", () => {
      this.onDisconnect();
    });

    this.socket.on("error", (error: Error) => {
      this.onError(error);
    });

    this.socket.emit("initial", (data: OnInitialDto) => {
      this.onInitial(data);
    });
  }

  private onConnect() {
    // console.log("Socket.IO connection established");
    this.spinner.start("Listening for changes...");
    // Perform any actions needed when the connection is established
  }

  private onChanges(data: OnChangesDto) {
    console.log("Received changes, updating...");
    this.generator.form(data);
  }

  private onDisconnect() {
    console.log("Socket.IO connection disconnected");
    // Perform any cleanup or reconnection logic here
  }

  private onError(error: Error) {
    console.error("Socket.IO error:", error.message);
    // Handle errors
  }

  private onInitial(data: OnInitialDto) {
    this.generator.form(data);
  }

  sendMessage(message: string) {
    this.socket.emit("message", message);
  }

  closeConnection() {
    this.socket.disconnect();
  }
}
