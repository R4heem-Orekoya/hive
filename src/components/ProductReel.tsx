'use client'

import { TQueryValidator } from "@/lib/validators/query-validator"
import { Product } from "@/payload-types"
import { trpc } from "@/trpc/client"
import { query } from "express"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import ProductListing from "./ProductListing"

interface ProductReelProps {
   title: string
   subtitle?: string
   href?: string
   query: TQueryValidator
}

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {
   
   const { data, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery({
      limit: props.query.limit ?? FALLBACK_LIMIT,
      query: props.query
   }, {
      getNextPageParam: (lastPage) => lastPage.nextPage
   })
   
   const products = data?.pages.flatMap((page) =>  page.items)
   
   let map: (Product | null)[] = []
   if(products && products.length){
      map = products
   }else if(isLoading) {
      map = new Array<null>(props.query.limit?? FALLBACK_LIMIT).fill(null)
   }
   
   
   return (
      <section className="py-12">
         <div className="flex items-center justify-between flex-wrap mb-4 max-sm:gap-6">
            <div className="max-w-2xl lg:max-w-4xl lg:px-0">
               {props.title ? <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">{props.title}</h1> : null}
               {props.subtitle ? <p className="mt-2 text-muted-foreground text-sm">{props.subtitle}</p> : null}
            </div>
            
            {props.href && <Link href={`/${props.href}`} className="flex items-center text-sm text-zinc-700 font-medium group">Shop the collection <ChevronRight aria-hidden className="h-4 w-4 text-zinc-500 group-hover:translate-x-1 duration-300"/></Link>}
         </div>
         
         <div className="relative">
            <div className="mt-6 flex items-center w-full">
               <div className="w-full grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
                  {map.map((product, i) => (
                     <ProductListing product={product} index={i} key={i}/>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default ProductReel
