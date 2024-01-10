import { AxiosInstance } from "axios";

export interface AuthClientConfiguration {
  url: string;
  isDebugMode: boolean;
  api: AxiosInstance;
}
