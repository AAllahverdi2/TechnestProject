import React from 'react'
import DashboardHero from '../../../components/Site/DashboardHero/Index'
import DashboardLeft from '../../../components/Site/DashboardLeft/Index'
import './Index.scss'
import { Helmet } from 'react-helmet'
import PersonalProfileRight from '../../../components/Site/PersonalProfileRight/Index'

const PersonalProfile = () => {
  return (
    <main className='persoProfile'>
      <Helmet>
        <title>Personal Profile</title>
      </Helmet>
      <DashboardHero />
      <section className="dashboardBottom">
        <div className="container">
          <div className="dashboardBottomInside">
            <div className="row justify-content-center" >
              <div className="col-lg-4 col-md-8 wow animate__animated animate__fadeInLeft">
                <DashboardLeft />
              </div>
              <div className="col-lg-8 wow animate__animated animate__fadeInRight">
                <PersonalProfileRight />
              </div>
            </div>
          </div>
        </div>
      </section>
  
    </main>
  )
}

export default PersonalProfile
