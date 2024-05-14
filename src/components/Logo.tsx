import { Archive } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils";

const Logo = ({ className } : { className?: string }) => {
   return (
      <Link href='/' className="flex items-center gap-2">
         <Archive size={25} className={cn("text-zinc-900", className)} strokeWidth={1.8}/>
         <span className="text-sm font-bold">Hive</span>
      </Link>
   )
}

export default Logo