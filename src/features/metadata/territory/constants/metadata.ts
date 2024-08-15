import z from "zod";

export const territoryFormSchema = z.object({
    userId: z.string().optional(),
    territoryName: z.string().min(1, "Required"),
});

export type TTerritoryFormSchema = z.infer<typeof territoryFormSchema>;
