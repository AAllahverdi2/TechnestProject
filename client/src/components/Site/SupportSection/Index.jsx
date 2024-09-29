import React from 'react'
import './Index.scss'
import peopl from '../../../assets/peopl.png'
import coin2 from '../../../assets/coin2.png'
import payment from '../../../assets/payment.png'
import planet from '../../../assets/planet.png'
import { useTranslation } from 'react-i18next'

const SupportSection = () => {
    const { t, i18n } = useTranslation()

    return (
        <section className='supportSection'>
            <div className="container">
                <div className="supportBox">
                    <div className='row g-4'>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp animate__delay-1s' data-wow-delay="0.1s">
                            <div className="supportCart">
                                <div className="supportCartTop">
                                    <img src={peopl} alt="peopl" />
                                </div>
                                <div className="supportCartBottom">
                                    <h6>

                                        {
                                            t('pages.home.supportSection.first')
                                        }

                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp animate__delay-3s' data-wow-delay="0.3s">
                            <div className="supportCart">
                                <div className="supportCartTop">
                                    <img src={coin2} alt="coin2" />
                                </div>
                                <div className="supportCartBottom">
                                    <h6>

                                        {
                                            t('pages.home.supportSection.second')
                                        }

                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated wow animate__fadeInUp animate__delay-5s' data-wow-delay="0.5s">
                            <div className="supportCart">
                                <div className="supportCartTop">
                                    <img src={payment} alt="payment" />
                                </div>
                                <div className="supportCartBottom">
                                    <h6>

                                        {
                                            t('pages.home.supportSection.third')
                                        }

                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated  wow animate__fadeInUp animate__delay-7s' data-wow-delay="0.7s">
                            <div className="supportCart">
                                <div className="supportCartTop">
                                    <img src={planet} alt="planet" />
                                </div>
                                <div className="supportCartBottom">
                                    <h6>

                                        {
                                            t('pages.home.supportSection.fourth')
                                        }

                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SupportSection
