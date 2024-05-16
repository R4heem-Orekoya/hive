import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from 'next/headers'
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface Props{
   closeOnCurrent: (path: string) => void
}

const AuthNavButtons = async ({ closeOnCurrent }: Props) => {
   
   const { user } = await getServerSideUser(cookies())
   
   
   
   if(!user) return (
      <div className='space-y-6 border-t border-zinc-700-200 px-4 py-6'>
         <div className='flow-root'>
            <Link
               onClick={() => closeOnCurrent('/sign-in')}
               href='/sign-in'
               className={buttonVariants({variant: "secondary", className: '-m-2 block p-2 font-medium text-zinc-900'})}>
               Sign in
            </Link>
         </div>
         <div className='flow-root'>
            <Link
               onClick={() => closeOnCurrent('/sign-up')}
               href='/sign-up'
               className={buttonVariants({variant: "secondary", className: '-m-2 block p-2 font-medium text-zinc-900'})}>
               Sign up
            </Link>
         </div>
      </div>
   )
   
   return null
}

export default AuthNavButtons
