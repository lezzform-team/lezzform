import { ProjectPlatform } from "@/clients/config/entities";
import { z } from "zod";

export const configInitializationSchema = z.object({
  applicationId: z.string().uuid(),
  platform: z.nativeEnum(ProjectPlatform),
});
