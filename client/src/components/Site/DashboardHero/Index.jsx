import React from 'react'
import './Index.scss'
import { Link, useLocation } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const DashboardHero = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const { t } = useTranslation()

    const location = useLocation()
    return (
        <section className='dashboardHero'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className="dashboardHeroLeft">
                            <ul className="dashboardLinks">
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/'}>
                                        {
                                            t('pages.dashboard.dashboardHeroSection.li1')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />
                                </li>
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/dashboard'}>
                                        {
                                            t('pages.dashboard.dashboardHeroSection.li2')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />
                                </li>
                                <li>
                                    {
                                        location.pathname === '/personalProfile' ? t('pages.dashboard.dashboardHeroSection.li4') :
                                            location.pathname === '/dashboard' ? t('pages.dashboard.dashboardHeroSection.li3') :
                                                location.pathname == '/myBid' ? t('pages.dashboard.dashboardHeroSection.li5') :
                                                    location.pathname == '/winningBids' ? t('pages.dashboard.dashboardHeroSection.li6') :
                                                        location.pathname == '/myFavorites' ? t('pages.dashboard.dashboardHeroSection.li7') :
                                                            location.pathname == '/myOrders' ? t('pages.dashboard.dashboardHeroSection.li8') :
                                                                location.pathname == '/myProducts' ? t('pages.dashboard.dashboardHeroSection.li9') : ""
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardHero
