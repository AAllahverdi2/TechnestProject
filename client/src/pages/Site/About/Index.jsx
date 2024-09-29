import React from 'react'
import AboutHeroSection from '../../../components/Site/AboutHeroSection/Index'
import AboutSecondSection from '../../../components/Site/AboutSecondSection/Index'
import AboutOdometrSection from '../../../components/Site/AboutOdometrSection/Index'
import TopWinnersSection from '../../../components/Site/TopWinnersSection/Index'
import ManagementSection from '../../../components/Site/ManagementSection/Index'
import LatestAuction from '../../../components/Site/LatestAuction/Index'
import TestimonialSection from '../../../components/Site/TestimonialSection/Index'
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <main className='about'>
      <Helmet>
        <title>About</title>
      </Helmet>
      <AboutHeroSection />
      <AboutSecondSection />
      <AboutOdometrSection />
      <TopWinnersSection />
      <ManagementSection />
      <LatestAuction />
      <TestimonialSection />
    </main>
  )
}

export default About
