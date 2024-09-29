import React from 'react'
import './Index.scss'
import { Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import aboutSection from '../../../assets/aboutSection.png'
import { useTranslation } from 'react-i18next'
const ProductHeroSection = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const { t } = useTranslation()
    return (
        <section className='productHeroSection'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className="productHeroSectionLeft">
                            <h1>
                                {
                                    t('pages.product.productHeroSection.h1')
                                }
                            </h1>
                            <ul>
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/'}>
                                        {
                                            t('pages.product.productHeroSection.li1')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />

                                </li>
                                <li>
                                    {
                                        t('pages.product.productHeroSection.li2')
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className="productHeroSectionRight">
                            <img src={aboutSection} alt="aboutSection" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductHeroSection
