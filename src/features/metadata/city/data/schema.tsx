import { z } from "zod";

export const cityListSchema = z.object({
    id: z.string().optional(),
    cityName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TCityListSchema = z.infer<typeof cityListSchema>;
