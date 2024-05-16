"use client"

import Wrapper from "./Wrapper"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from "./Logo"

const Footer = () => {
   const pathname = usePathname()
   const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in']
   
   
   return (
      <footer className="bg-zinc-50 border-t border-zinc-100">
         <Wrapper>
            <div>
               {pathsToMinimize.includes(pathname) ? null : (
                  <div className="flex justify-center py-6">
                     <Logo />
                  </div>
               )}
               
               {pathsToMinimize.includes(pathname) ? null : (
                  <div>
                     <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                           <div aria-hidden className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90 "></div>
                        </div>
                        
                        <div className="text-center relative mx-auto max-w-sm">
                           <h3 className="font-semibold text-zinc-900">Become a seller</h3>
                           <p className="mt-2 text-sm text-muted-foreground">
                              If you&apos;d like to sell high-quality products, you can do so in minutes.{" "}
                           </p>
                           <Link href='/sign-ui?as=seller' className="whitespace-nowrap font-medium text-black hover:text-zinc-900">Get started &rarr;</Link>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            
            <div className="py-10 md:flex md:place-items-center md:justify-between">
               <div className="text-center md:text-left ">
                  <p className="text-sm text-muted-foreground">&copy; {new Date().getUTCFullYear()} All Rights Reserved</p>
               </div>
               
               <div className="mt-4 flex items-center justify-center md:mt-10">
                  <div className="flex space-x-6">
                     <Link href='#' className="text-sm text-muted-foreground hover:text-zinc-600">Terms</Link>
                     <Link href='#' className="text-sm text-muted-foreground hover:text-zinc-600">Privacy</Link>
                     <Link href='#' className="text-sm text-muted-foreground hover:text-zinc-600">Cookie Policy</Link>
                  </div>
               </div>
            </div>
         </Wrapper>
      </footer>
   )
}

export default Footer
