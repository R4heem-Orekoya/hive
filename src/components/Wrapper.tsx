import { cn } from "@/lib/utils";
import { ReactNode } from "react"

const Wrapper = ({ className, children } : { className?: string; children: ReactNode }) => {
   return (
      <div className={cn("w-[min(1400px,90%)] mx-auto", className)}>
         {children}
      </div>
   )
}

export default Wrapper
