import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/get-payload'
import { notFound, redirect } from 'next/navigation'
import { Product, ProductFile, User } from '@/payload-types'
import { PRODUCTS_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Wrapper from '@/components/Wrapper'
import { buttonVariants } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import PaymentStatus from '@/components/PaymentStatus'

interface PageProps {
   searchParams: {
      [key: string]: string | string[] | undefined
   }
}

const page = async ({ searchParams }: PageProps) => {
   const orderId = searchParams.orderId
   const nextCookies = cookies()
   
   const { user } = await getServerSideUser(nextCookies)
   const payload = await getPayloadClient()
   
   const { docs: orders } = await payload.find({
      collection: 'orders',
      depth: 2,
      where: {
         id: {
            equals: orderId,
         },
      },
    })
    
   const [order] = orders

   if (!order) return notFound()
      
   const orderUserId = typeof order.user === 'string' ? order.user : order.user.id
   
   if (orderUserId !== user?.id) {
      return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
   }
   
   const products = order.products as Product[]
   
   const orderTotal = products.reduce((total, product) => { return total + product.price }, 0)
   
   
   return (
      <Wrapper className='relative lg:min-h-full'>
         <div className='hidden lg:fixed lg:top-[65px] lg:left-0 lg:block h-80 lg:h-[calc(100vh-65px)] lg:w-1/2 lg:pr-4 xl:pr-12'>
            <Image
               fill
               src='/checkout-thank-you.jpg'
               className='h-full w-full object-cover object-center'
               alt='thank you for your order'
            />
         </div>
         
         <div>
            <div className='mx-auto max-w-2xl py-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-20 xl:gap-x-24'>
               <div  className='lg:col-start-2'>
                  <p className='text-sm font-medium text-zinc-600'>
                     Order successful
                  </p>
                  <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                     Thanks for ordering
                  </h1>
                  
                  {order._isPaid ? (
                     <p className='mt-2 text-base text-muted-foreground'>
                        Your order was processed and your assets are
                        available to download below. We&apos;ve sent
                        your receipt and order details to{' '}
                        {typeof order.user !== 'string' ? (
                           <span className='font-medium text-zinc-900'>
                           {order.user.email}
                           </span>
                        ) : null}
                        .
                     </p>
                     ) : (
                        <p className='mt-2 text-base text-muted-foreground'>
                           We appreciate your order, and we&apos;re
                           currently processing it. So hang tight and
                           we&apos;ll send you confirmation very soon!
                        </p>
                     )
                  }
                     
                  <div className='mt-16 text-sm font-medium'>
                     <div className='text-muted-foreground'>
                        Order id.
                     </div>
                     
                     <div className='mt-2 text-gray-900'>
                        {order.id}
                     </div>
                     
                     <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                        {(order.products as Product[]).map((product) => { const label = PRODUCTS_CATEGORIES.find(({ value }) => value === product.category)?.label

                           const downloadUrl = (product.product_files as ProductFile).url as string

                           const { image } = product.images[0]

                           return (
                              <li key={product.id} className='flex items-center space-x-6 py-6'>
                                 <div className='relative h-32 w-32 flex-shrink-0'>
                                    {typeof image !== 'string' && image.url ? (
                                       <Image
                                          fill
                                          src={image.url}
                                          alt={`${product.name} image`}
                                          className='-w-full aspect-square flex-none rounded-md bg-gray-100 object-cover object-center'
                                       />
                                    ) : null}
                                 </div>

                                 <div className='flex-auto flex flex-col gap-4 justify-between'>
                                    <div className='space-y-1'>
                                       <h3 className='text-gray-900'>
                                          {product.name}
                                       </h3>

                                       <p className='my-1'>
                                          Category: {label}
                                       </p>
                                    </div>

                                    {order._isPaid ? (
                                       <a
                                          href={downloadUrl}
                                          download={product.name}
                                          className='text-zinc-600 font-semibold hover:underline underline-offset-2'>
                                          Download asset
                                       </a>
                                    ) : null}
                                 </div>

                                 <p className='flex-none font-medium text-zinc-900'>
                                    {formatPrice(product.price)}
                                 </p>
                              </li>
                           )
                        })}
                     </ul>
                     
                     <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                        <div className='flex justify-between'>
                           <p>Subtotal</p>
                           <p className='text-zinc-900'>
                           {formatPrice(orderTotal)}
                           </p>
                        </div>

                        <div className='flex justify-between'>
                           <p>Transaction Fee</p>
                           <p className='text-zinc-900'>
                           {formatPrice(1)}
                           </p>
                        </div>

                        <div className='flex items-center justify-between border-t border-zinc-200 pt-4 text-zinc-900'>
                           <p className='text-base'>Total</p>
                           <p className='text-base'>
                           {formatPrice(orderTotal + 1)}
                           </p>
                        </div>
                     </div>
                     
                     <PaymentStatus
                        isPaid={order._isPaid}
                        orderEmail={(order.user as User).email}
                        orderId={order.id}
                     />
                     
                     <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                        <Link
                           href='/products'
                           className={buttonVariants({variant: "ghost", className: "text-zinc-600 group"})}>
                           Continue shopping <ChevronRight className='w-4 h-4 group-hover:translate-x-1 text-zinc-600 duration-300'/>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Wrapper>
   )
}

export default page
