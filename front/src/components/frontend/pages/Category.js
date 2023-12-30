import React from 'react'
import { Hero } from '../layout/Hero'
import ProductCatalog from '../layout/ProductCatalog'
import EmailSubscribe from '../layout/EmailSubscribe'
import { useParams } from 'react-router'
const Category = () => {
  const categorytext = useParams();
  console.log(categorytext)
  return (
    <>
        <Hero title={`Category Products`} />
        <ProductCatalog title={"Category Products"} description={"Here are the best products that makes high sales in this month"} category={true} catename={categorytext.id} />
        
        <EmailSubscribe />
    </>
  )
}

export default Category