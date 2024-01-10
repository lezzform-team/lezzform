import { ConfigClient } from "@/clients/config";

export interface ListenerConfiguration {
  url: string;
  isDebugMode: boolean;
  config: ConfigClient;
}
