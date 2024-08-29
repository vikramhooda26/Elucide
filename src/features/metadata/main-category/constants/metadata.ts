import z from "zod";

export const maincategoryFormSchema = z.object({
    userId: z.string().optional(),
    categoryName: z.string()
});

export type TMaincategoryFormSchema = z.infer<typeof maincategoryFormSchema>;
