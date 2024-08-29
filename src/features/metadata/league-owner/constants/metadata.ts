import z from "zod";

export const leagueOwnerFormSchema = z.object({
    userId: z.string().optional(),
    leagueOwnerName: z.string()
});

export type TLeagueOwnerFormSchema = z.infer<typeof leagueOwnerFormSchema>;
