import { FormEntity } from "@/clients/form";
import { LezzformElement } from "@lezzform/types";

export interface ElementEntity {
  id: string;
  metadata: LezzformElement[];
  form: FormEntity;
  formId: string;
}
