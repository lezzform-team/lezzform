import axios, { AxiosInstance } from "axios";

export class Client {
  url: string;
  isDebugMode: boolean;
  api: AxiosInstance;

  constructor({
    isDebugMode,
    url,
    api,
  }: {
    url: string;
    isDebugMode: boolean;
    api: AxiosInstance;
  }) {
    this.url = url;
    this.isDebugMode = isDebugMode;

    this.api = api;
  }
}
