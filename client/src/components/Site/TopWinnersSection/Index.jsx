import React from 'react'
import './Index.scss'
import TopWinnersCard from '../Cards/TopWinnersCard/Index'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const TopWinnersSection = () => {
    const { winners } = useSelector(state => state.winners)
    const location = useLocation()
    const { t, i18n } = useTranslation()

    return (
        <section className='topWinnersSection' style={{ background: location.pathname == '/about' ? "#101046 " : "" }}>
            <div className="container">
                <div className="topWinnersSectionTop wow animate__animated animate__fadeInDown">
                    <h2>
                        {
                            t('pages.home.topWinnersSection.h2')
                        }
                    </h2>
                    <p>
                        {
                            t('pages.home.topWinnersSection.p')
                        }
                    </p>
                </div>
                <div className='row g-4'>
                    {
                        winners?.map((item, index) => {
                            return <div key={index} className='col-xl-3 col-lg-4 col-md-6 col-sm-6 wow animate__animated animate__fadeInUp' data-wow-delay={`${(index / 10) + 0.2}s`}>
                                <TopWinnersCard item={item} />
                            </div>

                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default TopWinnersSection
