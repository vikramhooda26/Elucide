import z from "zod";

export const stateFormSchema = z.object({
    userId: z.string().optional(),
    stateName: z.string(),
});

export type TStateFormSchema = z.infer<typeof stateFormSchema>;
