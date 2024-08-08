import { z } from "zod";

export const activeCampaignFormSchema = z.object({
    userId: z.string(),
    activeCampaignName: z.string(),
});

export type TActiveCampaignFormSchema = z.infer<
    typeof activeCampaignFormSchema
>;
