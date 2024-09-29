import React from 'react'
import ContactHeroSection from '../../../components/Site/ContactHeroSection/Index'
import ContactBottomSection from '../../../components/Site/ContactBottomSection/Index'
import { Helmet } from 'react-helmet'

const Contacts = () => {
  return (
    <main className='contacts'>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <ContactHeroSection />
      <ContactBottomSection />
    </main>
  )
}

export default Contacts
