import { AxiosInstance } from "axios";

export interface ApplicationClientConfiguration {
  isDebugMode: boolean;
  url: string;
  api: AxiosInstance;
}
