import { z } from "zod";

export const selectApplicationSchema = z.object({
  applicationId: z.string().uuid(),
});
