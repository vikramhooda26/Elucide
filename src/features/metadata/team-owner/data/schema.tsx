import { z } from "zod";

export const teamOwnerListSchema = z.object({
    id: z.string().optional(),
    teamOwnerName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TTeamOwnerListSchema = z.infer<typeof teamOwnerListSchema>;
