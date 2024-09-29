import React from 'react'
import ProductHeroSection from '../../../components/Site/ProductHeroSection/Index'
import LatestAuction from '../../../components/Site/LatestAuction/Index'
import { Helmet } from 'react-helmet'
import ProductFilterSection from '../../../components/Site/ProductFilterSection/Index'

const Product = () => {
  return (
    <main className='productsPage'>
      <Helmet>
        <title>Auction</title>
      </Helmet>
      <ProductHeroSection />
      <LatestAuction />
      <ProductFilterSection />
    </main>
  )
}

export default Product
