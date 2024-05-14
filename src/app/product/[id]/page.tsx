import Wrapper from "@/components/Wrapper"
import { PRODUCTS_CATEGORIES } from "@/config"
import { getPayloadClient } from "@/get-payload"
import { notFound } from "next/navigation"
import { Check, ChevronRight, Shield } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import ImageSlider from "@/components/ImageSlider"
import ProductReel from "@/components/ProductReel"
import AddToCartButton from "@/components/AddToCartButton"

interface PageProps {
   params: {
     id: string
   }
}

const BREADCRUMBS = [
   { id: 1, name: 'Home', href: '/' },
   { id: 2, name: 'Products', href: '/products' },
]
 
 
const page = async ({ params }: PageProps) => {
   const { id } = params
   
   const payload = await getPayloadClient()
   
   const { docs: products } = await payload.find({
      collection: 'products',
      limit: 1,
      where: {
        id: {
          equals: id,
        },
        approvedForSale: {
          equals: 'approved',
        },
      },
   })
   
   const [product] = products
   
   if (!product) return notFound()
      
   const label = PRODUCTS_CATEGORIES.find(({ value }) => value === product.category)?.label
   
   const validUrls = product.images.map(({ image }) => typeof image === 'string' ? image : image.url).filter(Boolean) as string[]
    
   return (
      <Wrapper className="lg:px-8 py-20">
         <ol className='flex items-center space-x-2'>
            {BREADCRUMBS.map((breadcrumb, i) => (
               <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                     <Link
                        href={breadcrumb.href}
                        className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                        {breadcrumb.name}
                     </Link>
                     {i !== BREADCRUMBS.length - 1 && (
                        <ChevronRight className="h-4 w-4 text-zinc-400 ml-2 flex-shrink-0"/>
                     )}
                  </div>
               </li>
            ))}
         </ol>
         
         <div className="mt-8 mb-20 flex max-lg:flex-wrap max-lg:flex-col-reverse gap-8">
            <div className="flex items-center flex-1">
               <ImageSlider urls={validUrls}/>
            </div>
            
            <div className="flex flex-col md:py-8 flex-1">
               <h1 className='text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl'>
                {product.name}
               </h1>
               <div className='flex items-center mt-4'>
                  <p className='font-medium text-zinc-900'>
                     {formatPrice(product.price)}
                  </p>

                  <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                     {label}
                  </div>
               </div>
               <div className='mt-4 space-y-6'>
                  <p className='text-base text-muted-foreground'>
                     {product.description}
                  </p>
               </div>
               <div className='mt-6 flex items-center'>
                  <Check
                     aria-hidden='true'
                     className='h-5 w-5 flex-shrink-0 text-green-500'
                  />
                  <p className='ml-2 text-sm text-muted-foreground'>
                     Eligible for instant delivery
                  </p>
               </div>
               
               <div className="mt-auto pt-8 w-full">
                  <AddToCartButton product={product}/>
                  
                  <div className='mt-6 text-center'>
                     <div className='group inline-flex text-sm text-medium'>
                        <Shield
                        aria-hidden='true'
                        className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                        />
                        <span className='text-muted-foreground hover:text-gray-700'>
                           30 Days Return Guarantee
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         <ProductReel
            href='/products'
            query={{ category: product.category, limit: 3 }}
            title={`Similar ${label}`}
            subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
         />
      </Wrapper>
   )
}

export default page
