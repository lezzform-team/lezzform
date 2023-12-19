export class ConfigEntity {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;

  constructor({
    accessToken,
    accessTokenExpiresIn,
    refreshToken,
    refreshTokenExpiresIn,
  }: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
  }) {
    this.accessToken = accessToken;
    this.accessTokenExpiresIn = accessTokenExpiresIn;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
  }
}
