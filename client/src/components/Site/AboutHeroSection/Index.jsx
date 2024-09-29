import React from 'react'
import './Index.scss'
import { Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import aboutSection from '../../../assets/aboutSection.png'
import { useTranslation } from 'react-i18next'
const AboutHeroSection = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const { t } = useTranslation()
    return (
        <section className='aboutHero'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className="aboutHeroLeft">
                            <h1>
                                {
                                    t('pages.aboutUs.heroSection.h1')
                                }
                            </h1>
                            <ul>
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/'}>
                                        {
                                            t('pages.aboutUs.heroSection.li1')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />

                                </li>
                                <li>
                                    {
                                        t('pages.aboutUs.heroSection.li2')
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className="aboutHeroRight">
                            <img src={aboutSection} alt="aboutSection" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHeroSection
