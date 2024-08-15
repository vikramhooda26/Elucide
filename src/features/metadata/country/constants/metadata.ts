import z from "zod";

export const countryFormSchema = z.object({
    userId: z.string().optional(),
    nationality: z.string().min(1, "Required"),
});

export type TCountryFormSchema = z.infer<typeof countryFormSchema>;
