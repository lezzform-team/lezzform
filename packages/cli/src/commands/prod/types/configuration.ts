import { ConfigClient } from "@/clients/config";

export interface ProdCommandConfiguration {
  isDebugMode: boolean;
  url: string;
  config: ConfigClient;
}
