'use client'

import { ArrowUpRight, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import Image from "next/image"
import Lottie from "lottie-react";
import EmptyCartAnimation from '../../public/empty-cart-animation.json'
import { useCart } from "@/hooks/use-cart"
import CartItem from "./CartItem"
import { ScrollArea } from "./ui/scroll-area"
import { useEffect, useState } from "react"


const Cart = () => {
   const [isMounted, setIsMounted] = useState(false)
   const { items } = useCart()
   const itemCount = items.length
   const cartTotal = items.reduce((total, {product}) => total + product.price, 0)
   const fee = 1
   
   useEffect(() => {
      setIsMounted(true)
   }, [])
   
   
   return (
      <Sheet>
         <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingBag aria-hidden className="h-5 text-zinc-500 group-hover:text-zinc-900 flex-shrink-0 "/>
            <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-900">{itemCount}</span>
         </SheetTrigger>
         <SheetContent className="flex flex-col w-full pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6 ">
               <SheetTitle>Cart ({isMounted && itemCount})</SheetTitle>
            </SheetHeader>
            
            {itemCount > 0 ? 
               (
                  <>
                     <div className="flex w-full flex-col pr-6">
                        Cart Items
                        <ScrollArea className="mt-4">
                           {items.map(({ product }) => (
                              <CartItem key={product.id} product={product}/>
                           ))}   
                        </ScrollArea>
                     </div>
                     <div className="space-y-4 pr-6">
                        <Separator />
                        <div className="w-full space-y-1.5 text-sm">
                           <div className="flex">
                              <span className="flex-1">Shipping</span>
                              <span>Free</span>
                           </div>
                           <div className="flex">
                              <span className="flex-1">Transaction Fee</span>
                              <span>{formatPrice(fee, {currency: 'USD'})}</span>
                           </div>
                           <div className="flex">
                              <span className="flex-1">Total</span>
                              <span>{formatPrice(cartTotal + fee, {currency: 'USD'})}</span>
                           </div> 
                           
                           <SheetFooter>
                              <SheetTrigger asChild>
                                 <Link href='/cart' className={buttonVariants({
                                    className: 'w-full'
                                 })}>Continue to Checkout</Link>
                              </SheetTrigger>
                           </SheetFooter>
                        </div>
                     </div>
                  </>
               ) : 
               (
                  <div className="flex h-full flex-col items-center justify-center space-y-1">
                     <div aria-hidden className="relative mb-4 aspect-square w-40 text-muted-foreground grayscale">
                        <Lottie animationData={EmptyCartAnimation} />
                     </div>
                     <div className="text-xl pb-6 font-semibold">Your cart is empty</div>
                     <SheetTrigger asChild>
                        <Link href='/product' className={buttonVariants({
                           variant: 'secondary',
                           className: 'text-sm'
                        })}>Add items to cart to checkout <ArrowUpRight className="h-4 text-muted-foreground" /></Link>
                     </SheetTrigger>
                  </div>
               )
            }
         </SheetContent>
      </Sheet>
   )
}

export default Cart
