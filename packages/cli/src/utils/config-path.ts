import { mergeTexts } from "@/utils";
import os from "os";
import path from "path";

export class ConfigPath {
  auth: string;
  project: string;

  projectRootDirectoryPath: string;
  authRootDirectoryPath: string;

  private isDebugMode: boolean;

  constructor({ isDebugMode }: { isDebugMode: boolean }) {
    this.isDebugMode = isDebugMode;

    this.authRootDirectoryPath = path.join(
      os.homedir(),
      mergeTexts(".lezzform", this.isDebugMode && "-debug")
    );
    this.auth = path.join(this.authRootDirectoryPath, "config.json");

    this.projectRootDirectoryPath = path.join(process.cwd(), "lezzform");
    this.project = path.join(this.projectRootDirectoryPath, "config.json");
  }
}

// configRootDirectoryPath: string;
// configPath: string;
// api: AxiosInstance = api;

// constructor(url: string) {
//   this.url = url;
//   this.authCommand = new AuthCommand(this.url);
//   this.configRootDirectoryPath = path.join(process.cwd(), "lezzform");
//   this.configPath = path.join(this.configRootDirectoryPath, "config.json");
// }
