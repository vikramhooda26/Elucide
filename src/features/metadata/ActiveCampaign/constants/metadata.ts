import { z } from "zod";

export const activeCampaignFormSchema = z.object({
  userId: z.string().optional(),
  activeCampaignName: z.string()
});

export type TActiveCampaignFormSchema = z.infer<typeof activeCampaignFormSchema>;
