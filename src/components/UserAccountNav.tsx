"use client"

import Link from "next/link"
import { User } from "../payload-types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"


const UserAccountNav = ({ user } : {user: User}) => {
   const { signOut } = useAuth()
   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="overflow-visible">
            <Avatar className="bg-accent">
               <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.email}`}/>
               <AvatarFallback className="uppercase bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg">{user.email.charAt(0)}</AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         
         <DropdownMenuContent className="bg-white w-60" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
               <div className="flex flex-col space-y-0.5 leading-none">
                  <p className="font-medium text-sm text-black">{user.email}</p>
               </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
               <Link href='/sell'>Seller Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
               Log out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default UserAccountNav
