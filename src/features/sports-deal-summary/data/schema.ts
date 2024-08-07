import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const schema = z.object({
    sportsDealSummaryId: z.string(),
    brandName: z.string().optional(),
    athleteName: z.string().optional(),
    teamName: z.string().optional(),
    leagueName: z.string().optional(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type schemaType = z.infer<typeof schema>;
