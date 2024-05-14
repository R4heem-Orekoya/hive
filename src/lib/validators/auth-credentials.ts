import { z } from "zod"

export const AuthCredentialsValidator = z.object({
   email: z.string().email({message: "Enter a valid email."}),
   password: z.string().min(8, {message: "Password must contain atleast 8 characters."})
})

export type TAuthCredentials = z.infer<typeof AuthCredentialsValidator>