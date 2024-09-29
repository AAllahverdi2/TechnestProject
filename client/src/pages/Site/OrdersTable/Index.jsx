import React from 'react'
import DashboardHero from '../../../components/Site/DashboardHero/Index'
import DashboardLeft from '../../../components/Site/DashboardLeft/Index'
import './Index.scss'
import { Helmet } from 'react-helmet'
import FavoritesRight from '../../../components/Site/FavoritesRight/Index'
import OrdersRight from '../../../components/Site/OrdersRight/Index'
const OrdersTable = () => {
    return (
        <main className='myBids'>
            <Helmet>
                <title>Orders</title>
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
                                <OrdersRight />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default OrdersTable
