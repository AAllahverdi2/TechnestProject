import React, { useEffect, useState } from 'react'
import DashboardHero from '../../../components/Site/DashboardHero/Index'
import DashboardLeft from '../../../components/Site/DashboardLeft/Index'
import './Index.scss'
import DashboardRight from '../../../components/Site/DashboardRight/Index'
import { Helmet } from 'react-helmet'
import { jwtDecode } from "jwt-decode";
import { useDataContext } from '../../../context/context'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router'
import AcceptModal from '../../../components/Site/Modals/AcceptModal/Index'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { setNotification, notification, paymentSuccess, setPaymentSuccess } = useDataContext()
  const location = useLocation()
  useEffect(() => {
    if (notification && location.pathname == '/dashboard') {
      setTimeout(() => {
        toast.error(notification.message, notification.options);
      }, 3000);
    }
  }, [notification]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const successParam = queryParams.get('success');

    if (successParam === 'true') {
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);

      }, 15000);
    } else {
      setPaymentSuccess(false);

    }
  }, [location.search]);
  return (
    <main className='dashboard'>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <DashboardHero />
      <section className="dashboardBottom">
        <div className="container">
          <div className="dashboardBottomInside">
            <div className="row justify-content-center" >
              <div className="col-lg-4 col-md-6 wow animate__animated animate__fadeInLeft">
                <DashboardLeft />
              </div>
              <div className="col-lg-8 wow animate__animated animate__fadeInRight">
                <DashboardRight />
              </div>
            </div>
          </div>
        </div>
      </section>
      {paymentSuccess == true ?
        <AcceptModal /> : ''
      }

    </main>
  )
}

export default Dashboard
