import { ConfigClient } from "@/clients/config";

export interface SocketClientConfiguration {
  isDebugMode: boolean;
  url: string;
  config: ConfigClient;
}
