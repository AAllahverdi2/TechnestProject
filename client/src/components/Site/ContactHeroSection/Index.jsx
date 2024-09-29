import React from 'react'
import './Index.scss'
import { Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import aboutSection from '../../../assets/aboutSection.png'
import { useTranslation } from 'react-i18next'
const ContactHeroSection = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const { t } = useTranslation()
    return (
        <section className='contactHeroSection'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className="contactHeroLeft">
                            <h1>

                                {
                                    t('pages.contactUs.contactUsHeroSection.h1')
                                }
                            </h1>
                            <ul>
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/'}>
                                        {
                                            t('pages.contactUs.contactUsHeroSection.li1')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />

                                </li>
                                <li>
                                    {
                                        t('pages.contactUs.contactUsHeroSection.li2')
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className="contactHeroRight">
                            <img src={aboutSection} alt="aboutSection" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactHeroSection
