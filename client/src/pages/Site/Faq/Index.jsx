import React from 'react'
import FaqHeroSection from '../../../components/Site/FaqHeroSection/Index'
import FaqBottomSection from '../../../components/Site/FaqBottomSection/Index'
import { Helmet } from 'react-helmet'
const Faq = () => {
  return (
    <main className='faqPage'>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <FaqHeroSection />
      <FaqBottomSection />
    </main>
  )
}

export default Faq
