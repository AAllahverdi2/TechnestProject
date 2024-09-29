import React, { useEffect } from 'react'
import './Index.scss'
import dasOdo1 from '../../../assets/dasOdo1.png'
import dasOdo2 from '../../../assets/dasOdo2.png'
import dasOdo3 from '../../../assets/dasOdo3.png'
import tableProdImage from '../../../assets/tableProdImage.png'
import 'odometer/themes/odometer-theme-default.css';
import Odometer from 'odometer';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBiddersProducts, getAllUserProducts } from '../../../redux/slices/producSlice'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { mdiDelete, mdiDeleteEmpty } from '@mdi/js'
import Icon from '@mdi/react'
import { removeFromBasket } from '../../../redux/slices/userSlice'
import toast from 'react-hot-toast'
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { useDataContext } from '../../../context/context'
import { useTranslation } from 'react-i18next'
const DashboardRight = () => {
    const { userToken } = useSelector(state => state.users)
    const { userWinningProducts } = useSelector(state => state.winningProducts)

    const { oneUserAllProducts, oneBiddersProduct } = useSelector(state => state.products)
    const filteredProducts2 = oneBiddersProduct.filter(product => product.userId !== product.bidderId);
    const { handleOpenCheckout } = useDataContext()
    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken && userToken?.isLogin == true) {
            dispatch(getAllUserProducts(userToken.id))
            dispatch(getAllBiddersProducts(userToken.id))
        }

    }, [])
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer75'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 20) {
                odometer.update(filteredProducts2?.length);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [userToken]);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer76'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 20) {
                odometer.update(userWinningProducts?.length);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [userToken]);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer77'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 20) {
                odometer.update(userToken?.wishlist?.length);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [userToken]);

    const { t } = useTranslation()

    return (
        <div className='dashboardRight'>
            <div className="dashboardRightTop animate__animated wow animate__fadeInRight" data-wow-delay="0.2s">
                <h5 className='dashboardRightTopTitle'>
                    {
                        t('pages.dashboard.dashboardRight.h5')
                    }
                </h5>
                <div className='row g-4'>
                    <div className='col-xl-4 col-lg-6 col-md-6'>
                        <div className="dashboardRightTopBox">
                            <div className="dashboardRightTopBoxLeft">
                                <img src={dasOdo1} alt="dasOdo1" />
                            </div>
                            <div className="dashboardRightTopBoxRight">
                                <h3 className='odometer75 odometer-auto-theme' data-odometer-final={userToken?.activeBids}>97</h3>
                                <h5>
                                    {
                                        t('pages.dashboard.dashboardRight.cards.firstTitle')
                                    }

                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-6 col-md-6'>
                        <div className="dashboardRightTopBox">
                            <div className="dashboardRightTopBoxLeft">
                                <img src={dasOdo2} alt="dasOdo1" />
                            </div>
                            <div className="dashboardRightTopBoxRight">
                                <h3 className='odometer76 odoMetrH3 odometer-auto-theme' data-odometer-final={userToken?.winningBids}>17</h3>
                                <h5>
                                    {
                                        t('pages.dashboard.dashboardRight.cards.secondTitle')
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-6 col-md-6'>
                        <div className="dashboardRightTopBox">
                            <div className="dashboardRightTopBoxLeft">
                                <img src={dasOdo3} alt="dasOdo1" />
                            </div>
                            <div className="dashboardRightTopBoxRight">
                                <h3 className='odometer77 odometer-auto-theme' data-odometer-final={userToken?.bidsInWishlist}>212</h3>
                                <h5>

                                    {
                                        t('pages.dashboard.dashboardRight.cards.thirdTitle')
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboardRightBottom animate__animated wow animate__fadeInRight" data-wow-delay="0.3s">
                {
                    userToken?.basket?.length == 0 ? <p className='emptyBasket'>
                        {
                            t('pages.dashboard.dashboardRight.basketTable.emptyText')
                        }
                    </p> : <table>
                        <thead>
                            <tr className="borderNone">
                                <th>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.th1')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.th2')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.th3')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.th4')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.th5')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.th6')
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userToken?.basket?.map((item, index) => {
                                    return <tr key={index} className="tb1">
                                        <td className="tdFirst">
                                            <div className="tdFirstIcon">
                                                <img src={`http://localhost:5050/public/${item.productImages[0]}`} alt="tbimage" />
                                            </div>
                                        </td>
                                        <td><Link to={`/product/${item._id}`}>
                                            {item.productName.slice(0, 10)}....
                                        </Link></td>

                                        <td>${item.minimumBidPrice}</td>
                                        <td>${item.afterPrice}</td>
                                        <td> {moment(item.endTime).format('MM/DD/YYYY')}
                                        </td>
                                        <td>
                                            <button className='deleteBtnInTestimonials' onClick={async () => {
                                                const filterBasket = userToken?.basket?.find(prod => prod._id == item?._id)

                                                if (!filterBasket) {
                                                    toast.error(t('pages.dashboard.dashboardRight.deleteBtnMessage.errorMessage'))

                                                } else {
                                                    await dispatch(removeFromBasket({ id: filterBasket?._id }))
                                                    toast.success(t('pages.dashboard.dashboardRight.deleteBtnMessage.successMessage'))
                                                }
                                            }}>
                                                <span className='testimonialFirstDelete'>
                                                    <Icon path={mdiDelete} size={1} />
                                                </span>
                                                <span className='testimonialSecondDelete'>
                                                    <Icon path={mdiDeleteEmpty} size={1} />

                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }


                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6"><button onClick={handleOpenCheckout} className='checkOutBtn'>
                                    {
                                        t('pages.dashboard.dashboardRight.basketTable.checkOutBtn')
                                    }</button></td>
                            </tr>
                        </tfoot>
                    </table>
                }
            </div>

        </div>
    )
}

export default DashboardRight
