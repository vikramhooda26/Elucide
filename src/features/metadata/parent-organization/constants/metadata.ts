import z from "zod";

export const parentOrgFormSchema = z.object({
    userId: z.string().optional(),
    parentOrgName: z.string().min(1, "Required"),
});

export type TParentOrgFormSchema = z.infer<typeof parentOrgFormSchema>;
