import { FormEntity } from "@/clients/form";

export interface ApplicationEntity {
  id: string;
  name: string;
  forms: FormEntity[];
}
