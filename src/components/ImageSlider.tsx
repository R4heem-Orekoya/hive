"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

interface ImageSliderProps{
   urls: string[]
}

const ImageSlider = ({ urls }: ImageSliderProps ) => {
   return (
      <div className="group bg-zinc-100 rounded-lg border overflow-hidden">
         <Carousel 
            className="w-full h-full rounded-lg relative">
            <CarouselContent>
               {urls.map((url, i) => (
                  <CarouselItem
                     key={i}
                     className='z-10 w-full h-full'>
                     {/* <Image loading='eager' src={url} alt="Product image" fill className="w-full h-full object-cover object-center"/> */}
                     <img src={url} alt="" className="w-full h-full object-cover object-center"/>
                  </CarouselItem>
               ))}
            </CarouselContent>
            
            <div className="lg:opacity-0 group-hover:opacity-100">
               <CarouselPrevious className="bg-white"/>
               <CarouselNext className="bg-white"/>   
            </div>
         </Carousel>
      </div>
   )
}

export default ImageSlider
