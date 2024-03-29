import { FormEntity } from "../../../../types";

export class OnApplicationInitial {
  id: string;
  name: string;
  forms: { form: FormEntity; code: { web: string; mobile: string } }[];

  constructor({
    id,
    name,
    forms,
  }: {
    id: string;
    name: string;
    forms: { form: FormEntity; code: { web: string; mobile: string } }[];
  }) {
    this.id = id;
    this.name = name;
    this.forms = forms;
  }
}
