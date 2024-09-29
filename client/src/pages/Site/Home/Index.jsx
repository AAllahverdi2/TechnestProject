import React, { useEffect } from 'react'
import HeroSection from '../../../components/Site/HeroSection/Index'
import SupportSection from '../../../components/Site/SupportSection/Index'
import WorkSection from '../../../components/Site/WorkSection/Index'
import LatestAuction from '../../../components/Site/LatestAuction/Index'
import { Helmet } from 'react-helmet'
import UpcomingAuction from '../../../components/Site/UpcomingAuction/Index'
import RegisterFreeSection from '../../../components/Site/RegisterFreeSection/Index'
import TopWinnersSection from '../../../components/Site/TopWinnersSection/Index'
import ManagementSection from '../../../components/Site/ManagementSection/Index'
import TestimonialSection from '../../../components/Site/TestimonialSection/Index'
import { useDataContext } from '../../../context/context'
import { useLocation } from 'react-router'
const Home = () => {
  const { openUpdatePassModal } = useDataContext();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    if (token) {
      openUpdatePassModal();
    }
  }, [location.search, openUpdatePassModal]);

  return (
    <main >
      <Helmet>
        <title>Home</title>
      </Helmet>

 
      <HeroSection />
      <SupportSection />
      <WorkSection />
      <LatestAuction />
      <UpcomingAuction />
      <RegisterFreeSection />
      <TopWinnersSection />
      <TestimonialSection />
      <ManagementSection />
    </main>
  )
}

export default Home
