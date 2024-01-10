import { ConfigClient } from "@/clients/config";

export interface DevCommandConfiguration {
  url: string;
  isDebugMode: boolean;
  config: ConfigClient;
}
