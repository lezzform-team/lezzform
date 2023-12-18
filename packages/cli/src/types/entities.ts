import { LezzformElement } from "@lezzform/types";

export interface ElementEntity {
  id: string;
  metadata: LezzformElement[];
  form: FormEntity;
  formId: string;
}

export interface FormEntity {
  id: string;
  name: string;
  applicationId: string;
  activeElementId: string;
  activeElement: ElementEntity;
}

export interface ApplicationEntity {
  id: string;
  name: string;
  forms: FormEntity[];
}
