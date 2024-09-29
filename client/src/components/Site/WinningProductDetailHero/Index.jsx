import React from 'react'
import prodDetail from '../../../assets/prodDetail.png'
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
const WinningProductDetailHero = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const { t } = useTranslation()
    return (
        <section className='productDetailHeroSection'>
            <div className="container">
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-md-6'>
                        <div className="productDetailHeroSectionLeft">
                            <h1>
                                {
                                    t('pages.winningBidsDetail.heroSection.h1')
                                }
                            </h1>
                            <ul>
                                <li>
                                    <Link onClick={handleScrollToTop} to={'/dashboard'}>
                                        {
                                            t('pages.winningBidsDetail.heroSection.li1')
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <MdKeyboardDoubleArrowRight />

                                </li>
                                <li>
                                    {
                                        t('pages.winningBidsDetail.heroSection.li2')
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className="productDetailHeroSectionRight">
                            <img src={prodDetail} alt="prodDetail" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WinningProductDetailHero
