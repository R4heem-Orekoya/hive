"use client"

import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PaymentStatusProps{
   orderEmail: string
   orderId: string
   isPaid: boolean
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
   const { data } = trpc.payment.pollOrderStatus.useQuery({orderId}, {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000)
   })
   
   const router = useRouter()
   
   useEffect(() => {
      if(data?.isPaid) router.refresh()
   }, [data?.isPaid, router])
   
   return (
      <div className="flex flex-wrap justify-between items-start mt-16 gap-4 text-sm text-zinc-600">
         <div>
            <p className="font-medium text-zinc-900">Shipping To</p>
            <p>{orderEmail}</p>
         </div>
         
         <div>
            <p className="font-medium text-zinc-900 ">Order Status</p>
            <p>{isPaid ? "Payment successful" : "Pending payment"}</p>
         </div>
      </div>
   )
}

export default PaymentStatus
