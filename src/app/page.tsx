"use client"

import Wrapper from "@/components/Wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { perks } from "@/consts/perks"
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import ProductReel from "@/components/ProductReel"

const page = () => {
  return (
    <>
      <Wrapper>
        <section className="py-20 text-center flex flex-col items-center max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-10">
            Your digital marketplace for high-quality{' '}
            <span className="font-bold">digital assests</span>.
          </h1>
          <p className="text-lg mt-6 text-muted-foreground max-w-2xl">
            Welcome to  
            <span className="font-bold text-zinc-800"> Hive</span>. 
            Every asset on our platform is verified by our team to ensure our highest 
            quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href='/products' className={buttonVariants()}>Browse Trending </Link>
            <Button variant='ghost' className="group">Our quality promise <ChevronRight size={15} className="group-hover:translate-x-1 duration-300 text-muted-foreground"/></Button>
          </div>
        </section>
        
        <ProductReel 
          query={{
            sort: "desc",
            limit: 6,
          }} 
          title="New Arrivals" 
          subtitle="Newly arrived digital assets" 
          href="products"
        />
      </Wrapper>
      
      <section className="border-t border-zinc-100 bg-zinc-50 py-20">
        <Wrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
            {perks.map(perk => (
              <div key={perk.name} className="text-center">
                <div className="flex justify-center">
                  <div className="h-12 aspect-square rounded-full bg-zinc-200 grid place-items-center">
                    <>
                    {
                      perk.Icon === 'ArrowDown' ? <ArrowDownToLine size={18}/> 
                      : perk.Icon === 'CheckCircle' ? <CheckCircle size={18}/>
                      : perk.Icon === 'Leaf' ? <Leaf size={18}/> : null
                    }
                    </>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-zinc-800">{perk.name}</h3>
                  <p className="text-sm text-muted-foreground mt-4">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>
    </>
  )
}

export default page

