"use client"
import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface verifyEmailProps{
   token: string
}

const VerifyEmail = ({token} : verifyEmailProps) => {
   const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
      token
   })
   
   if(isError) {
      return (
         <div className="flex flex-col gap-2 items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <h3 className="font-semibold text-xl">There was a problem </h3>
            <p className="text-muted-foregrounded text-sm text-center">
               Token is not valid or might be expired. Please try again.
            </p>
         </div>
      )
   }
   
   if (data?.success) {
      return (
         <div className="flex h-full flex-col items-center justify-center ">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
               <Image src="/message-sent.png" alt="The email was sent image" fill />
            </div>
            
            <h3 className="font-semibold text-2xl">You&apos;re all set</h3>
            <p className="text-muted-foreground text-center mt-1">Thanks for verifying your email</p>
            <Link href="/sign-in" className={buttonVariants({className: "mt-4"})}>Sign In</Link>
         </div>
      )
   }
   
   if(isLoading) {
      return (
         <div className="flex flex-col gap-2 items-center">
            <Loader2 className="animate-spin h-8 w-8 text-zinc-600" />
            <h3 className="font-semibold text-xl">Verifying...</h3>
            <p className="text-muted-foregrounded text-sm text-center">
               This won&apos;t take long.
            </p>
         </div>
      )
   }
}

export default VerifyEmail
