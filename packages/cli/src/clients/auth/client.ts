import { Maybe } from "@/types";
import { Client } from "../client";
import { LoginDto } from "./dto";
import { LoginEntity } from "./entities";
import { AuthClientConfiguration } from "./types";
import { loginSchema } from "./validators";

export class AuthClient extends Client {
  constructor(config: AuthClientConfiguration) {
    super({
      isDebugMode: config.isDebugMode,
      url: config.url,
      api: config.api,
    });
  }

  async login(dto: Maybe<LoginDto>): Promise<LoginEntity> {
    const parsedDto = loginSchema.parse(dto);
    const { data } = await this.api.post<LoginEntity>(
      "/auth/login/cli",
      parsedDto
    );

    return data;
  }

  async verify(): Promise<boolean> {
    const { data } = await this.api.get("/auth/verify");

    return Boolean(data);
  }
}
