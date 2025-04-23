import { z } from "zod";

export const createSchema = (fieldNames: { name: string }) =>
  z.object({
    id: z.string(),
    [fieldNames.name]: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    createdBy: z.string(),
    modifiedBy: z.string()
  });
