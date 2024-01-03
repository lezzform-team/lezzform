import { FormEntity } from "@/types";

export class OnFormUpdateDto {
  before: FormEntity;
  after: FormEntity;

  constructor({ after, before }: { before: FormEntity; after: FormEntity }) {
    this.after = after;
    this.before = before;
  }
}
