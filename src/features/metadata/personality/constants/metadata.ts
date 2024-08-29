import { z } from "zod";

export const persoanlityFormSchema = z.object({
    userId: z.string().optional(),
    personalityName: z.string()
});

export type TPersonalityFormSchema = z.infer<typeof persoanlityFormSchema>;
