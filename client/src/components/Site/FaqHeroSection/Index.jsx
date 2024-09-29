import React from 'react'
import './Index.scss'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import faqPage from '../../../assets/faqPage.png'
import { useTranslation } from 'react-i18next'
const FaqHeroSection = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const { t } = useTranslation()
    return (
        <section className='faqHeroSection'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className="faqHeroSectionLeft">
                            <h1>
                                {
                                    t('pages.faq.faqHeroSection.h1')
                                }
                            </h1>
                            <ul>
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/'}>
                                        {
                                            t('pages.faq.faqHeroSection.li1')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />

                                </li>
                                <li>
                                    {
                                        t('pages.faq.faqHeroSection.li2')
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className="faqHeroSectionRight">
                            <img src={faqPage} alt="faqPage" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqHeroSection
