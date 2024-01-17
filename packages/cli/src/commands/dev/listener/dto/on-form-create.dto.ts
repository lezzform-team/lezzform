import { FormEntity } from "../../../../types";

export class OnFormCreateDto {
  form: FormEntity;
  code: { web: string; mobile: string };

  constructor({ code, form }: { form: FormEntity; code: string }) {
    this.code = code;
    this.form = form;
  }
}
