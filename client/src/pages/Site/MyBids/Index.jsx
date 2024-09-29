import React from 'react'
import DashboardHero from '../../../components/Site/DashboardHero/Index'
import DashboardLeft from '../../../components/Site/DashboardLeft/Index'
import './Index.scss'
import { Helmet } from 'react-helmet'
import MyBidsRight from '../../../components/Site/MyBidsRight/Index'
const MyBids = () => {
  return (
    <main className='myBids'>
      <Helmet>
        <title>My Products</title>
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
                <MyBidsRight />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MyBids
