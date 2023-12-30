import React from 'react'
import { Hero } from '../layout/Hero'
import Stores from '../layout/Stores'
import EmailSubscribe from '../layout/EmailSubscribe'

const StoresPage = () => {
  return (
    <>
        <Hero title={"Stores on BaraBazar"} description={"Here are the all store or vendors that helps BaraBazar to show you amazing products"} />
        <Stores />
        <EmailSubscribe />
    </>
  )
}

export default StoresPage