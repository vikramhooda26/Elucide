import z from "zod";

export const cityFormSchema = z.object({
    userId: z.string().optional(),
    cityName: z.string()
});

export type TCityFormSchema = z.infer<typeof cityFormSchema>;
