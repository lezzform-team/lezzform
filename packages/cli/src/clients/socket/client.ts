import { Socket, io } from "socket.io-client";
import { SocketClientConfiguration } from "./types";
import { ConfigClient } from "../config";

export class SocketClient {
  socket: Socket;
  isDebugMode: boolean;
  config: ConfigClient;

  private url: string;

  constructor(config: SocketClientConfiguration) {
    this.config = config.config;
    this.isDebugMode = config.isDebugMode;
    this.url = config.url;

    this.socket = io(`${this.url}/cli`, {
      extraHeaders: {
        Authorization: `Bearer ${this.config.auth?.accessToken!}`,
        ["x-auth-source"]: "cli",
      },
      auth: {
        token: `Bearer ${this.config.auth?.accessToken!}`,
      },
      query: {
        applicationId: this.config.project?.applicationId,
        platform: this.config.project?.platform,
      },
    });
  }
}
