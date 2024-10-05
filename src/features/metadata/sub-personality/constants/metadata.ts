import z from "zod";

export const subpersonalityFormSchema = z.object({
    userId: z.string().optional(),
    subpersonalityName: z.string().min(1, "Please provide a sub personality"),
    mainPersonalityId: z.string().min(1, "Please select a main personality")
});

export type TSubpersonalityFormSchema = z.infer<typeof subpersonalityFormSchema>;
