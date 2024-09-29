import React from 'react'
import DashboardHero from '../../../components/Site/DashboardHero/Index'
import DashboardLeft from '../../../components/Site/DashboardLeft/Index'
import './Index.scss'
import { Helmet } from 'react-helmet'
import MyBidRight from '../../../components/Site/MyBidRight/Index'
const MyBid = () => {
    return (
        <main className='myBids'>
            <Helmet>
                <title>My Bids</title>
            </Helmet>
            <DashboardHero />
            <section className="myBidssBottom">
                <div className="container">
                    <div className="myBidssBottomInside">
                        <div className="row justify-content-center" >
                            <div className="col-lg-4 col-md-8 wow animate__animated animate__fadeInLeft">
                                <DashboardLeft />
                            </div>
                            <div className="col-lg-8 wow animate__animated animate__fadeInRight">
                                <MyBidRight />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default MyBid
