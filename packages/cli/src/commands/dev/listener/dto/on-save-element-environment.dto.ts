import { FormEntity } from "../../../../types";

export class OnSaveElementEnvironmentDto {
  form: FormEntity;
  code: string;

  constructor({ code, form }: { form: FormEntity; code: string }) {
    this.code = code;
    this.form = form;
  }
}
