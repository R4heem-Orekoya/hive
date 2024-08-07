"use client"

import Logo from "@/components/Logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { cn } from "@/lib/utils"
import { ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCredentialsValidator, TAuthCredentials } from "@/lib/validators/auth-credentials"
import { trpc } from "@/trpc/client"
import { useRouter, useSearchParams } from "next/navigation"

const Page = () => {
   const searchParams = useSearchParams()
   const router = useRouter()
   const isSeller = searchParams.get('as') === 'seller'
   const origin = searchParams.get('origin')
   
   const continueAsSeller = () => {
      router.push("?as=seller")
   }
   const continueAsBuyer = () => {
      router.replace("/sign-in", undefined)
   }
   
   const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentials>({
      resolver: zodResolver(AuthCredentialsValidator)
   })
   
   
   const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
      onSuccess: () => {
         toast.success("Signed in Successfully.")
                  
         if(origin) {
            router.push(`/${origin}`)
            return
         }
         
         if(isSeller){
            router.push("/sell")
            return
         }
         
         router.push('/')
         router.refresh()
      },
      onError: (error) => {
         if(error.data?.code === "UNAUTHORIZED"){
            toast.error("Something went wrong, check your email and password then try again.")
         }
      }
   })
   
   const onSubmit = ({ email, password }: TAuthCredentials) => {
      signIn({email, password})
   }
   
   return (
      <>
         <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col items-center space-y-2 text-center">
                  <Logo className="h-10 w-10"/>
                  <h1 className="text-2xl font-semibold">Login to your {isSeller ? "dashboard": "account"}</h1>
                  <Link 
                     className={buttonVariants({
                           variant: 'link',
                           className: 'group'
                     })} 
                     href="/sign-up">
                     Don&apos; have an account? Sign In
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
                        
                        <Button disabled={isLoading} className={cn({"disabled:cursor-not-allowed": isLoading})}>
                           {isLoading && (
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                           )}
                           Sign in
                        </Button>
                     </div>
                  </form>
                  
                  <div className="relative">
                     <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <span className="border-t w-full"/>
                     </div>
                     <div className="relative flex justify-center text-sm">
                        <span className="bg-background px-2 text-muted-foreground">or</span>
                     </div>
                  </div>
                  
                  {isSeller ? (
                     <Button onClick={continueAsBuyer} variant="secondary" disabled={isLoading} className={cn({"disabled:cursor-not-allowed": isLoading})}>
                        Continue as customer
                     </Button>
                     ) : (
                     <Button onClick={continueAsSeller} variant="secondary" disabled={isLoading} className={cn({"disabled:cursor-not-allowed": isLoading})}>
                        Continue as seller
                     </Button>
                     )
                  }
               </div>
            </div>
         </div>
      </>
   )
}

export default Page

