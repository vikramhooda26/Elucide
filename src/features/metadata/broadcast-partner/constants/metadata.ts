import z from "zod";

export const broadcastPartnerFormSchema = z.object({
    userId: z.string().optional(),
    broadcastPartnerName: z.string(),
});

export type TBroadcastPartnerFormSchema = z.infer<
    typeof broadcastPartnerFormSchema
>;
