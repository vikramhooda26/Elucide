import z from "zod";

export const stateFormSchema = z.object({
    userId: z.string(),
    stateName: z.string(),
});

export type TStateFormSchema = z.infer<typeof stateFormSchema>;
