import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  date_joined: z.string(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "STAFF", "USER"])
});
