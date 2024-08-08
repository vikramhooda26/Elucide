import { z } from "zod";

export const countryListSchema = z.object({
    id: z.string().optional(),
    nationalityName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TCountryListSchema = z.infer<typeof countryListSchema>;
