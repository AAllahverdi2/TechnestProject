import React, { Suspense } from 'react'
import './Index.scss'
import { Link } from 'react-router-dom'
import heroImage from '../../../assets/hero.png'
import shape1 from '../../../assets/shape1.png'
import coin from '../../../assets/coin.png'
import { useDataContext } from '../../../context/context'
import { useTranslation } from 'react-i18next'
const HeroSection = () => {
    const { t, i18n } = useTranslation()
    const { handleOpenRegisterModal } = useDataContext()
    return (
        <section className='heroSection'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-7 wow fadeInUp animate__delay-2s' data-wow-delay="0.2s">
                        <div className="heroLeftContainer">
                            <h1>
                                {
                                    t(`pages.home.heroSection.h1`)
                                }
                            </h1>
                            <p>

                                {
                                    t(`pages.home.heroSection.p`)
                                }

                            </p>
                            <button onClick={handleOpenRegisterModal} className='blueBtn'>
                                {
                                    t(`pages.home.heroSection.btn`)
                                }
                            </button>
                        </div>
                    </div>

                    <div className='col-lg-5 wow animate__fadeInDown animate__delay-2s' data-wow-delay="0.2s">\
                        <div className="heroRightContainer">
                            <img src={heroImage} alt="hero" />
                            <div className="animatedHeroImage1">
                                <img src={shape1} alt="shape1" />
                            </div>
                            <div className="animatedHeroImage2">
                                <img src={coin} alt="coin" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
