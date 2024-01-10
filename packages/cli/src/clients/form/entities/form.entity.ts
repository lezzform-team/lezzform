import { ElementEntity } from "@/clients/element";

export interface FormEntity {
  id: string;
  name: string;
  fileName: string;
  applicationId: string;
  activeElementId: string;
  activeElement: ElementEntity;
}
