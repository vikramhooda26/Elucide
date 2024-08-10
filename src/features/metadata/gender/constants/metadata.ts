import { z } from "zod";
export const genderFormSchema = z.object({
    userId: z.string(),
    gender: z.string(),
});

export type TGenderFormSchema = z.infer<typeof genderFormSchema>;
