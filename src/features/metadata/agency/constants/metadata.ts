import z from "zod";

export const agencyFormSchema = z.object({
  userId: z.string().optional(),
  agencyName: z.string()
});

export type TAgencyFormSchema = z.infer<typeof agencyFormSchema>;
