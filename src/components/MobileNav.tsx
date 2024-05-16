'use client'

import { PRODUCTS_CATEGORIES } from '@/config'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { buttonVariants } from './ui/button'

const MobileNav = () => {
   const [isOpen, setIsOpen] = useState(false)

   const pathname = usePathname()

   // whenever we click an item in the menu and navigate away, we want to close the menu
   useEffect(() => {
      setIsOpen(false)
   }, [pathname])

   // when we click the path we are currently on, we still want the mobile menu to close,
   // however we cant rely on the pathname for it because that won't change (we're already there)
   const closeOnCurrent = (href: string) => {
      if (pathname === href) {
         setIsOpen(false)
      }
   }

  // remove second scrollbar when mobile menu is open
   useEffect(() => {
      if (isOpen)
         document.body.classList.add('overflow-hidden')
      else document.body.classList.remove('overflow-hidden')
   }, [isOpen])

   if (!isOpen) return (
         <button type='button'onClick={() => setIsOpen(true)} className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-zinc-800'>
            <Menu className='h-6 w-6' aria-hidden='true' />
         </button>
   )

   return (
      <div>
         <div className='relative z-40 lg:hidden'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
         </div>

         <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex'>
         <div className='w-4/5 ml-auto'>
            <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
               <div className='flex px-4 pb-2 pt-5'>
                  <button type='button' onClick={() => setIsOpen(false)} className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-zinc-800'>
                     <X className='h-6 w-6' aria-hidden='true' />
                  </button>
               </div>

               <div className='mt-2'>
                  <ul>
                     {PRODUCTS_CATEGORIES.map((category) => (
                        <li key={category.label} className='space-y-10 px-4 pb-8 pt-10'>
                           <div className='border-b border-gray-200'>
                              <div className='-mb-px flex'>
                                 <p className='border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium'>
                                 {category.label}
                                 </p>
                              </div>
                           </div>

                           <div className='grid grid-cols-2 gap-y-10 gap-x-4'>
                              {category.features.map((item) => (
                                 <Link href={item.href} key={item.name} className='group relative text-sm'>
                                    <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                       <Image
                                          fill
                                          src={item.imageSrc}
                                          alt='product category image'
                                          className='object-cover object-center'
                                       />
                                    </div>
                                    <Link
                                       href={item.href}
                                       className='mt-6 block font-medium text-gray-900'>
                                       {item.name}
                                    </Link>
                                 </Link>
                              ))}
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>

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
            </div>
         </div>
         </div>
      </div>
   )
}

export default MobileNav