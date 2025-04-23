import z from "zod";

export const keyMarketFormSchema = z.object({
  userId: z.string().optional(),
  keyMarketName: z.string()
});

export type TKeyMarketFormSchema = z.infer<typeof keyMarketFormSchema>;
