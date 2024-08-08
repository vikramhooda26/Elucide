import { z } from "zod";

export const broadcastPartnerListSchema = z.object({
    broadcastPartnerId: z.string(),
    broadcastPartnerName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TBroadcastPartnerListSchema = z.infer<
    typeof broadcastPartnerListSchema
>;
