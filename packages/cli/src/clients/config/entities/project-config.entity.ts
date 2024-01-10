export class ProjectConfigEntity {
  applicationId: string;

  constructor({ applicationId }: { applicationId: string }) {
    this.applicationId = applicationId;
  }
}
