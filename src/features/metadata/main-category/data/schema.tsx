import { z } from "zod";

export const mainCategoryListSchema = z.object({
    id: z.string().optional(),
    categoryName: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string(),
});

export type TMainCategoryListSchema = z.infer<typeof mainCategoryListSchema>;
