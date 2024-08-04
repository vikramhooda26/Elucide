import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const brandSchema = z.object({
  "name": z.string(),
  "createdDate": z.string(),
  "modifiedDate": z.string(),
  "createdBy": z.string(),
  "modifiedBy": z.string(),
})

export type Brand = z.infer<typeof brandSchema>
