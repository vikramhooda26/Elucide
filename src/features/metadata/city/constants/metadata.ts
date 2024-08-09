import z from "zod";

export const cityFormSchema = z.object({
    userId: z.string(),
    cityName: z.string(),
});

export type TCityFormSchema = z.infer<typeof cityFormSchema>;
