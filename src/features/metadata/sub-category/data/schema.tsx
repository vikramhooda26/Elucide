import { z } from "zod";

export const subcategoryListSchema = z.object({
    id: z.string().optional(),
    subcategoryName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TSubcategoryListSchema = z.infer<typeof subcategoryListSchema>;
