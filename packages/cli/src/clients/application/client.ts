import { Client } from "../client";
import { ApplicationEntity } from "./entities";
import { ApplicationClientConfiguration } from "./types";

export class ApplicationClient extends Client {
  constructor(config: ApplicationClientConfiguration) {
    super({
      isDebugMode: config.isDebugMode,
      url: config.url,
      api: config.api,
    });
  }

  async findAll(): Promise<ApplicationEntity[]> {
    const { data } = await this.api.get<ApplicationEntity[]>("/applications");

    return data;
  }
}
