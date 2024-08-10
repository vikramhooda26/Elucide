import z from "zod";

export const subCategoryFormSchema = z.object({
    userId: z.string(),
    categoryId: z.string(),
    subcategoryName: z.string(),
});

export type TSubCategoryFormSchema = z.infer<typeof subCategoryFormSchema>;
