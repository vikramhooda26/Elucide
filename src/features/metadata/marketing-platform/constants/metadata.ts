import z from "zod";

export const marketingPlatformFormSchema = z.object({
  userId: z.string().optional(),
  marketingPlatformName: z.string().min(1, "Required")
});

export type TMarketingPlatformFormSchema = z.infer<typeof marketingPlatformFormSchema>;
