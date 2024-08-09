import z from "zod";

export const taglineFormSchema = z.object({
    userId: z.string(),
    taglineName: z.string().min(1, "Required"),
});

export type TTaglineFormSchema = z.infer<typeof taglineFormSchema>;
