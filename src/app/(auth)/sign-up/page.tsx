"use client"

import Logo from "@/components/Logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCredentialsValidator, TAuthCredentials } from "@/lib/validators/auth-credentials"
import { trpc } from "@/trpc/client"
import { ZodError } from "zod"
import { useRouter } from "next/navigation"

const Page = () => {
   const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentials>({
      resolver: zodResolver(AuthCredentialsValidator)
   })
   
   const router = useRouter()
   
   const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
         if(err.data?.code === "CONFLICT"){
            toast.error("This email is already in use. Sign in instead?")
            return
         }
         
         if(err instanceof ZodError) {
            toast.error(err.issues[0].message)
            return
         }
         toast.error("Something went wrong. Please try again.")
      },
      onSuccess: ({sentToEmail}) => {
         toast.success(`Verification email sent to ${sentToEmail}.`)
         router.push('/verify-email?to=' + sentToEmail)
      }
   })
   
   const onSubmit = ({ email, password }: TAuthCredentials) => {
      mutate({email, password})
   }
   
   return (
      <>
         <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col items-center space-y-2 text-center">
                  <Logo className="h-10 w-10"/>
                  <h1 className="text-2xl font-semibold">Create an account</h1>
                  <Link 
                     className={buttonVariants({
                           variant: 'link',
                           className: 'group'
                     })} 
                     href="/sign-in">
                     Already have an account? Sign In
                     <ChevronRight className="h-4 w-4 group-hover:ml-1 duration-300"/>
                  </Link>
               </div>
               
               <div className="grid gap-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="grid gap-2">
                        <div className="grid gap-2 py-2">
                           <Label htmlFor='email'>Email</Label>
                           <Input 
                              disabled={isLoading}
                              {...register("email")}
                              className={cn({
                                 "focus-visible:ring-red-500": errors.email,
                                 "disabled:cursor-not-allowed": isLoading
                              })}
                              placeholder="youremail@gmail.com"
                           />
                           {errors.email && <span className="text-red-500 text-xs -mt-1">{errors.email.message}</span>}
                        </div>
                        <div className="grid gap-2 py-2">
                           <Label htmlFor='password'>Password</Label>
                           <Input 
                              disabled={isLoading}
                              {...register("password")}
                              className={cn({
                                 "focus-visible:ring-red-500": errors.password,
                                 "disabled:cursor-not-allowed": isLoading
                              })}
                              type="password"
                              placeholder="yourstrongpassword"
                           />
                           {errors.password && <span className="text-red-500 text-xs -mt-1">{errors.password.message}</span>}
                        </div>
                        
                        <Button disabled={isLoading} className={cn({"disabled:cursor-not-allowed": isLoading})}>Sign up</Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}

export default Page
