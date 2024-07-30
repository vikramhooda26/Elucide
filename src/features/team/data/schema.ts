import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const teamSchema = z.object({
  "athleteName": z.string(),
  "createdDate": z.string(),
  "modifiedData": z.string(),
  "createdBy": z.string(),
  "modifiedBy": z.string(),
})

export type Team = z.infer<typeof teamSchema>
