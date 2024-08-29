import z from "zod";

export const teamOwnerFormSchema = z.object({
    userId: z.string().optional(),
    teamOwnerName: z.string().min(1, "Required")
});

export type TTeamOwnerFormSchema = z.infer<typeof teamOwnerFormSchema>;
