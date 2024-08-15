import z from "zod";

export const associationSchema = z.object({
    userId: z.string().optional(),
    associationLevelName: z.string().min(1, "Required"),
});

export type TAssociationSchema = z.infer<typeof associationSchema>;
