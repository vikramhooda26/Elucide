import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const leagueSchema = z.object({
  "leagueName": z.string(),
  "createdDate": z.string(),
  "modifiedDate": z.string(),
  "createdBy": z.string(),
  "modifiedBy": z.string(),
})

export type League = z.infer<typeof leagueSchema>
