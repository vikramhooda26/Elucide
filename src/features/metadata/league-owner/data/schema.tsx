import { z } from "zod";

export const leagueOwnerListSchema = z.object({
    id: z.string().optional(),
    leagueOwnerName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TLeagueOwnerListSchema = z.infer<typeof leagueOwnerListSchema>;
