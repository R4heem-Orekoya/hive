import ProductReel from "@/components/ProductReel"
import Wrapper from "@/components/Wrapper"
import { PRODUCTS_CATEGORIES } from "@/config"

type param = string | string[] | undefined

interface ProductsPageProps{
   searchParams: {[key: string]: param}
}

const parse = (param: param) => {
   return typeof param === "string" ? param : undefined
}

const Page = ({ searchParams }: ProductsPageProps) => {
   const sort = parse(searchParams.sort)
   const category = parse(searchParams.category)
   
   const label = PRODUCTS_CATEGORIES.find(({ value }) => value === category)?.label
   return (
      <Wrapper>
         <ProductReel title={label ?? "Browse high-quality digital products"} query={{
            category, limit: 40, sort: sort === "desc" || sort === "asc" ? sort : undefined
         }}/>
      </Wrapper>
   )
}

export default Page