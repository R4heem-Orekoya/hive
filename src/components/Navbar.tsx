import Wrapper from "./Wrapper"
import Link from "next/link"
import Navitems from "./Navitems"
import { buttonVariants } from "./ui/button"
import Cart from "./Cart"
import Logo from "./Logo"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import UserAccountNav from "./UserAccountNav"
import { cn } from "@/lib/utils"

const Navbar = async () => {
   const nextCookies = cookies()
   const {user} = await getServerSideUser(nextCookies)
      
   return (
      <div className="bg-white sticky z-50 top-0">
         <header className="relative bg-white border-b py-3 border-zinc-100">
            <Wrapper>
               <div className={cn("flex max-sm:flex-wrap items-center justify-between gap-4", {"max-sm:justify-center": !user})}>
                  <div className="flex items-center">
                     <div className="ml-4 flex lg:ml-0">
                        <Logo />
                     </div>
                     
                     <div className="hidden z-50 lg-ml-8 lg:block lg:self-stretch">
                        <Navitems />
                     </div>  
                  </div>
                  
                  <div className="flex items-center flex-wrap">
                     <div className="flex lg:flex-1 items-center justify-end space-x-3 lg:space-x-6">
                        {user ? null : <Link href='/sign-in' className={buttonVariants({variant: 'ghost'})}>Sign In</Link>}
                        {!user && <span className="h-6 w-px bg-zinc-200" aria-hidden/>}
                        {user ? (<UserAccountNav user={user}/>) : (<Link href='/sign-up' className={buttonVariants({variant: 'ghost'})}>Create account</Link>)}
                        {user && <span className="h-6 w-px bg-zinc-200" aria-hidden/>}
                        {!user && (
                           <div className="flex lg:ml-6">
                              <span className="h-6 w-px bg-zinc-200" aria-hidden/>
                           </div>
                        )}
                        
                        <div className="ml-4 flow-root lg:ml-6">
                           <Cart />
                        </div>
                     </div>
                     
                     {/* <MobileNav /> */}
                  </div>
               </div>
            </Wrapper>
         </header>
      </div>
   )
}

export default Navbar