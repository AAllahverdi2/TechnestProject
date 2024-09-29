import React from 'react';
import './Index.scss'
import aboutSection2 from '../../../assets/aboutSection2.png'
import aboutSu1 from '../../../assets/aboutSu1.png'
import aboutSu2 from '../../../assets/aboutSu2.png'
import aboutSu3 from '../../../assets/aboutSu3.png'
import { useTranslation } from 'react-i18next';

const AboutSecondSection = () => {
    const { t } = useTranslation()
    return (
        <section className='aboutSecondSection'>
            <div className="container">
                <div className="row align-items-center">
                    <div className='col-lg-6 wow animate__fadeInLeft animate__animated'>
                        <div className="aboutSecondSectionLeft">
                            <img src={aboutSection2} alt="aboutSection2" />
                        </div>
                    </div>
                    <div className='col-lg-6 wow animate__animated animate__fadeInRight'>
                        <div className="aboutSecondSectionRight">
                            <div className="aboutSecondLeftTop wow animate__animated animate__fadeInDown">
                                <h2>
                                    {
                                        t('pages.aboutUs.aboutUsSection.h2')
                                    }
                                </h2>
                                <p>
                                    {
                                        t('pages.aboutUs.aboutUsSection.p')
                                    }
                                </p>
                            </div>
                            <ul className="aboutSecondLeftBottom">
                                <li>
                                    <div className="aboutSecondLeftBottomIcon">
                                        <img src={aboutSu1} alt="aboutSu1" />
                                    </div>
                                    <div className="aboutSecondLeftBottomText">
                                        <h5>

                                            {
                                                t('pages.aboutUs.aboutUsSection.textBoxs.first.title')
                                            }

                                        </h5>
                                        <p>

                                            {
                                                t('pages.aboutUs.aboutUsSection.textBoxs.first.text')
                                            }

                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="aboutSecondLeftBottomIcon">
                                        <img src={aboutSu2} alt="aboutSu2" />
                                    </div>
                                    <div className="aboutSecondLeftBottomText">
                                        <h5>

                                            {
                                                t('pages.aboutUs.aboutUsSection.textBoxs.second.title')
                                            }

                                        </h5>
                                        <p>

                                            {
                                                t('pages.aboutUs.aboutUsSection.textBoxs.second.text')
                                            }

                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="aboutSecondLeftBottomIcon">
                                        <img src={aboutSu3} alt="aboutSu3" />
                                    </div>
                                    <div className="aboutSecondLeftBottomText">
                                        <h5>
                                            {
                                                t('pages.aboutUs.aboutUsSection.textBoxs.second.title')
                                            }
                                        </h5>
                                        <p>
                                            {
                                                t('pages.aboutUs.aboutUsSection.textBoxs.second.text')
                                            }
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSecondSection
