import { ConfigClient } from "@/clients/config";
import { ConfigPath } from "@/utils";
import axios, { AxiosInstance } from "axios";

export class Command {
  url: string;
  isDebugMode: boolean;
  configPath: ConfigPath;
  api: AxiosInstance;
  config: ConfigClient;

  constructor({
    config,
    isDebugMode,
    url,
  }: {
    config: ConfigClient;
    isDebugMode: boolean;
    url: string;
  }) {
    this.config = config;
    this.isDebugMode = isDebugMode;
    this.url = url;

    this.configPath = new ConfigPath({ isDebugMode });

    this.api = axios.create({
      baseURL: this.url,
      headers: { ["x-auth-source"]: "cli" },
    });
  }

  setApiToken(accessToken: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
