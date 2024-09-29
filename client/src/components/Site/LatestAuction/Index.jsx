import React from 'react'
import './Index.scss'
import { Link, useLocation } from 'react-router-dom'
import LatestAuctionCard from '../Cards/LatestAuctionCard/Index'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const LatestAuction = () => {
    const location = useLocation()
    const { lastestProd } = useSelector(state => state.products)

    const filteredProducts = lastestProd.filter(product => product.createdAt);

    const sortedProducts = filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const latestProducts = sortedProducts.slice(0, 3);

    const { t, i18n } = useTranslation()

    return (
        <section className='latestAuction' style={{ background: location.pathname == '/about' || location.pathname == '/product' ? "#000036" : "" }}>
            <div className="container">
                <div className="latestAuctionTop  wow animate__animated animate__fadeInDown">
                    <h2>
                        {
                            t('pages.home.latestsAuction.h2')
                        }
                    </h2>
                    <p>
                        {
                            t('pages.home.latestsAuction.p')
                        }                    </p>
                </div>
                <div className="row">
                    {
                        latestProducts?.map((item, index) => {
                            return <div key={index} className='col-lg-4 col-md-6 wow  animate__animated animate__fadeInUp' data-wow-delay={`${(index / 10) + 0.2}s`}>
                                <LatestAuctionCard index={index} item={item} />
                            </div>
                        })
                    }




                </div>
                <div className="latestAuctionBottom animate__animated animate__fadeInUp wow" data-wow-delay="0.8s">
                    <Link to={'/product'} className='blueAnotherBtn'>
                        {
                            t('pages.home.latestsAuction.a')
                        }
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default LatestAuction
