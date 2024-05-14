'use client'

import { PRODUCTS_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import Navitem from "./Navitem"
import { useOnClickOutside } from "@/hooks/useclickoutside"

const Navitems = () => {
   const [activeIndex, setActiveIndex] = useState<null | number>(null)
   
   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         if(e.key === 'Escape') setActiveIndex(null)
      }
   
      document.addEventListener('keydown', handler)
      
      return () => {
         document.removeEventListener('keydown', handler)
      }
   }, [])
   
   const isAnyOpen = activeIndex !== null;
   
   const navRef = useRef<HTMLDivElement | null>(null)
   
   useOnClickOutside(navRef, () => setActiveIndex(null))
   
   return (
      <div ref={navRef} className="ml-8 flex items-center gap-4 min-h-full">
         {PRODUCTS_CATEGORIES.map((category, i) => {
            const handleOpen = () => {
               if(activeIndex === i) {
                  setActiveIndex(null)
               } else{
                  setActiveIndex(i)
               }
            }
            
            const isOpen = i === activeIndex
            
            return (
               <Navitem 
                  category={category}
                  isOpen={isOpen}
                  handleOpen={handleOpen}
                  key={category.value}
                  isAnyOpen={isAnyOpen}
               />
            )
         })}
      </div>
   )
}


export default Navitems