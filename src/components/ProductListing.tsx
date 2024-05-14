"use client"

import { Product } from "@/payload-types"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/Skeleton"
import Link from "next/link"
import { cn, formatPrice } from "@/lib/utils"
import { PRODUCTS_CATEGORIES } from "@/config"
import ImageSlider from "./ImageSlider"

interface ProductListingProps{
   product: Product | null
   index: number
}

const ProductListing = ({ product, index }: ProductListingProps) => {
   const [isVisible, setIsVisible] = useState(false)
   
   useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, index * 75)
  
      return () => clearTimeout(timer)
    }, [index])
   
   if(!product || !isVisible) return <ProductPlaceHolder />
   
   const label = PRODUCTS_CATEGORIES.find(({ value }) => value === product.category)?.label
      
   const validUrls = product.images.map(({ image }) => (typeof image === "string" ? image : image.url)).filter(Boolean) as string[]
   
   if(isVisible && product) return (
      <Link className={cn("invisible h-full w-full aspect-square cursor-pointer group/main", {
         "visible animate-in fade-in-5": isVisible
      })} href={`/product/${product.id}`}>
         <div className="flex flex-col w-full h-full">
            <ImageSlider urls={validUrls}/>
            
            <h3 className="mt-4 font-medium text-sm text-zinc-700">{product.name}</h3>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
            <p className="mt-1 font-semibold text-xs text-zinc-900">{formatPrice(product.price)}</p>
         </div>
      </Link>
   )
}

const ProductPlaceHolder = () => {
   return (
      <div className="flex flex-col w-full ">
         <div className="bg-zinc-100 aspect-square w-full overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full"/>
         </div>
         <Skeleton className="mt-4 w-2/3 h-4 rounded-lg"/>
         <Skeleton className="mt-2 w-32 h-4 rounded-lg"/>
         <Skeleton className="mt-2 w-12 h-4 rounded-lg"/>
      </div>
   )
}

export default ProductListing