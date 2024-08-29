import z from "zod";

export const nccsFormSchema = z.object({
    userId: z.string().optional(),
    nccsClass: z.string()
});

export type TNccsFormSchema = z.infer<typeof nccsFormSchema>;
