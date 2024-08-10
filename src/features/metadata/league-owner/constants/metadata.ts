import z from "zod";

export const leagueOwnerFormSchema = z.object({
    userId: z.string(),
    leagueOwnerName: z.string(),
});

export type TLeagueOwnerFormSchema = z.infer<typeof leagueOwnerFormSchema>;
