import z from "zod";

export const levelFormSchema = z.object({
    userId: z.string(),
    levelName: z.string(),
});

export type TLevelFormSchema = z.infer<typeof levelFormSchema>;
