import z from "zod";

export const ottPartnerFormSchema = z.object({
  userId: z.string().optional(),
  ottPartnerName: z.string()
});

export type TOttPartnerFormSchema = z.infer<typeof ottPartnerFormSchema>;
