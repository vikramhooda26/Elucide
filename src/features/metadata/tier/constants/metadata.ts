import z from "zod";

export const tierFormSchema = z.object({
    userId: z.string(),
    tierName: z.string().min(1, "Required"),
});

export type TTierFormSchema = z.infer<typeof tierFormSchema>;
