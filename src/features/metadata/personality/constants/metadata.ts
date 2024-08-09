import { z } from "zod";

export const persoanlityFormSchema = z.object({
    userId: z.string(),
    personalityName: z.string(),
});

export type TPersonalityFormSchema = z.infer<typeof persoanlityFormSchema>;
