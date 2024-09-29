import React from 'react'
import './Index.scss'
import komp from '../../../assets/komp.png'
import container from '../../../assets/container.png'
import bit from '../../../assets/bit.png'
import win from '../../../assets/win.png'
import arrow from '../../../assets/arrow.png'
import { useTranslation } from 'react-i18next'

const WorkSection = () => {
    const { t, i18n } = useTranslation()

    return (
        <section className='workSection'>
            <div className="container">
                <div className="workSectionTop wow animate__fadeInDown animate__animated">
                    <h2>
                        {
                            t('pages.home.workSection.top.h2')
                        }
                    </h2>
                    <p>
                        {
                            t('pages.home.workSection.top.p')
                        }
                    </p>
                </div>
                <div className="workSectionBottom">
                    <div className="workSectionBottomInside">
                        <div className="row workCardRow g-5" >
                            <div className='col-xl-3 cards col-lg-4 col-md-6 col-sm-6 wow animate__animated animate__fadeInUp ' data-wow-delay="0.2s">
                                <div className="workCardInside">
                                    <div className="workCardInsideTop">
                                        <img src={komp} alt="komp" />
                                        <span>01</span>
                                    </div>
                                    <div className="workCardInsideBottom">
                                        <h5>
                                            {
                                                t('pages.home.workSection.first.title')
                                            }
                                        </h5>
                                        <p>
                                            {
                                                t('pages.home.workSection.first.text')
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 wow animate__animated animate__fadeInUp ' data-wow-delay="0.4s">
                                <div className="workCardInside">
                                    <div className="workCardInsideArrow">
                                        <img src={arrow} alt="arrow" />
                                    </div>
                                    <div className="workCardInsideTop">
                                        <img src={container} alt="container" />
                                        <span>02</span>
                                    </div>
                                    <div className="workCardInsideBottom">
                                        <h5>
                                            {
                                                t('pages.home.workSection.second.title')
                                            }
                                        </h5>
                                        <p>
                                            {
                                                t('pages.home.workSection.second.text')
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 wow animate__animated animate__fadeInUp ' data-wow-delay="0.7s">
                                <div className="workCardInside">
                                    <div className="workCardInsideArrow arrow3">
                                        <img src={arrow} alt="arrow" />
                                    </div>
                                    <div className="workCardInsideTop">
                                        <img src={bit} alt="bit" />
                                        <span>03</span>
                                    </div>
                                    <div className="workCardInsideBottom">
                                        <h5>
                                            {
                                                t('pages.home.workSection.third.title')
                                            }
                                        </h5>
                                        <p>
                                            {
                                                t('pages.home.workSection.third.text')
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 wow animate__animated animate__fadeInUp ' data-wow-delay="0.7s">
                                <div className="workCardInside">
                                    <div className="workCardInsideArrow arrow4">
                                        <img src={arrow} alt="arrow" />
                                    </div>
                                    <div className="workCardInsideTop">
                                        <img src={win} alt="win" />
                                        <span>04</span>
                                    </div>
                                    <div className="workCardInsideBottom">
                                        <h5>
                                            {
                                                t('pages.home.workSection.fourth.title')
                                            }
                                        </h5>
                                        <p>
                                            {
                                                t('pages.home.workSection.fourth.text')
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkSection
