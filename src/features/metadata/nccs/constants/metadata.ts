import z from "zod";

export const nccsFormSchema = z.object({
    userId: z.string(),
    nccsClass: z.string(),
});

export type TNccsFormSchema = z.infer<typeof nccsFormSchema>;
