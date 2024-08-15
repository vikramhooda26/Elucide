import z from "zod";

export const sportFormSchema = z.object({
    userId: z.string().optional(),
    sportName: z.string().min(1, "Required"),
});

export type TSportFormSchema = z.infer<typeof sportFormSchema>;
