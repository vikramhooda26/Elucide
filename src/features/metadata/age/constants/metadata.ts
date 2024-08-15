import { z } from "zod";

export const ageRangeFormSchema = z.object({
    ageRange: z.number().array(),
    ageType: z.enum(["Range", "Max"]),
    userId: z.string().optional(),
});

export type TAgeRangeFormSchema = z.infer<typeof ageRangeFormSchema>;
