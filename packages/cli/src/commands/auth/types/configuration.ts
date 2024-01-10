import { ConfigClient } from "@/clients/config";
import { AxiosInstance } from "axios";

export interface AuthCommandConfiguration {
  api?: AxiosInstance;
  config: ConfigClient;
  url: string;
  isDebugMode: boolean;
}
