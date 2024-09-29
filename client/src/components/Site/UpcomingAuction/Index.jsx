import React, { useEffect, useState } from 'react'
import './Index.scss'
import UpcomingCard from '../Cards/UpcomingCard/Index'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const UpcomingAuction = () => {
    const { products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [randomProducts, setRandomProducts] = useState([]);
    const { t, i18n } = useTranslation()

    useEffect(() => {
        const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

        const selectedProducts = shuffledProducts.slice(0, 6);
        setRandomProducts(selectedProducts);
    }, [products]);
    return (
        <section className='upcomingAuction'>
            <div className="container">
                <div className="upcomingAuctionTop wow animate__animated animate__fadeInDown">
                    <h2>
                        {
                            t('pages.home.upcomingAuction.h2')
                        }

                    </h2>
                    <p>
                        {
                            t('pages.home.upcomingAuction.p')
                        }
                    </p>
                </div>
                <div className="upcomingAuctionBottom">
                    <div className='row g-4 justify-content-center'>
                        {
                            randomProducts?.map((item, index) => {
                                return <div key={index} className='col-xl-6 col-lg-9 wow animate__fadeInUp animate__animated' data-wow-delay={`${(index / 10) + 0.4}s`}>
                                    <UpcomingCard index={index} item={item} />
                                </div>
                            })
                        }


                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpcomingAuction
