import React from 'react'
import DashboardHero from '../../../components/Site/DashboardHero/Index'
import DashboardLeft from '../../../components/Site/DashboardLeft/Index'
import './Index.scss'
import { Helmet } from 'react-helmet'
import FavoritesRight from '../../../components/Site/FavoritesRight/Index'
const MyFavorites = () => {
  return (
    <main className='myBids'>
      <Helmet>
        <title>Favorites</title>
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
                <FavoritesRight />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MyFavorites
