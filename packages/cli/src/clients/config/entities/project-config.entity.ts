export class ProjectConfigEntity {
  applicationId: string;
  platform: ProjectPlatform;

  constructor({
    applicationId,
    platform,
  }: {
    applicationId: string;
    platform: ProjectPlatform;
  }) {
    this.applicationId = applicationId;
    this.platform = platform;
  }
}

export enum ProjectPlatform {
  Mobile = "mobile",
  Web = "web",
}
