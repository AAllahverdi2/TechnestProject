import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'odometer/themes/odometer-theme-default.css'; // Import odometer styles
import Odometer from 'odometer';
import eye from '../../../assets/eye.png'
import detailbd from '../../../assets/detailbd.png'
import Rating from '@mui/material/Rating';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { FaFacebookF, FaInstagram, FaLinkedin, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const WinningProductDetailMiddle = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const dispatch = useDispatch()
    const { oneWinningProduct } = useSelector(state => state.winningProducts)

    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer1200'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 880) {
                odometer.update(oneWinningProduct?.product && oneWinningProduct?.product[0]?.watching);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [oneWinningProduct]);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer1500'),
            value: 0,
            format: '(,ddd)',
        });


        odometer.update(oneWinningProduct?.product && oneWinningProduct?.product[0]?.totalBids);
    }, [oneWinningProduct]);

    const inputValueRef = useRef()

    const { t } = useTranslation()
    return (
        <>
            <section className='productDetailMiddle'>
                <div className="container">
                    <div className="row">
                        <div className='col-xl-7 animate__animated animate__fadeInLeft'>
                            <div className="productDetailMiddleLeft">
                                <div className="productDetailSwiper">
                                    <Swiper
                                        loop={true}
                                        spaceBetween={10}
                                        autoplay={{ delay: 5000 }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Autoplay, Navigation, Thumbs]}
                                        className="mySwiper5"
                                    >
                                        {
                                            oneWinningProduct?.product && oneWinningProduct?.product[0]?.productImages?.map((item, index) => {
                                                return <SwiperSlide key={index} className='mySwiper5__slide'>
                                                    <div className="detailSwiperInside1">
                                                        <img src={`http://localhost:5050/public/${item}`} alt='swiperImage' />
                                                    </div>
                                                </SwiperSlide>
                                            })
                                        }


                                    </Swiper>
                                    <div className="sliderBottomBox">
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop={true}
                                            spaceBetween={10}
                                            slidesPerView={5}
                                            navigation={true}
                                            centeredSlides={true}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            autoplay={{ delay: 5000 }}
                                            modules={[FreeMode, Autoplay, Navigation, Thumbs]}
                                            breakpoints={{
                                                300: {
                                                    slidesPerView: 2,
                                                },
                                                470: {
                                                    slidesPerView: 3,
                                                },
                                                767: {
                                                    slidesPerView: 5,
                                                },
                                            }}
                                            className="mySwiper7"
                                        >

                                            {
                                                oneWinningProduct?.product && oneWinningProduct?.product[0]?.productImages?.map((item, index) => {
                                                    return <SwiperSlide key={index + 2} className='mySwiper7__slide'>
                                                        <img src={`http://localhost:5050/public/${item}`} alt='swiperImage' />
                                                    </SwiperSlide>
                                                })
                                            }

                                        </Swiper>
                                    </div>
                                </div>
                                <div className="detailAboutPrice">
                                    <h3>
                                        {oneWinningProduct?.product && oneWinningProduct?.product[0]?.productName}
                                    </h3>
                                    <ul>
                                        <li>
                                            <h5 className="aboutPriceTitle">
                                                {
                                                    t('pages.winningBidsDetail.middleSection.left.h5')
                                                }
                                            </h5>
                                            <h4 className="bluePrice">
                                                US ${oneWinningProduct?.product && oneWinningProduct?.product[0]?.afterPrice}
                                            </h4>
                                        </li>
                                        <li>
                                            <p className="detailAboutPriceP">
                                                {
                                                    t('pages.winningBidsDetail.middleSection.left.p1')
                                                }
                                            </p>
                                            <h5 className="detailAboutPriceH">
                                                20.00%

                                            </h5>
                                        </li>
                                        <li>
                                            <p className="detailAboutPriceP">
                                                {
                                                    t('pages.winningBidsDetail.middleSection.left.p2')
                                                }


                                            </p>
                                            <h5 className="detailAboutPriceH">
                                                ${oneWinningProduct?.product && oneWinningProduct?.product[0]?.minimumBidPrice}

                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                                <div className="detailPriceInput">
                                    <form action="#" onSubmit={(e) => {
                                        e.preventDefault()
                                    }}>
                                        <input type="text" disabled placeholder={t('pages.winningBidsDetail.middleSection.left.placeholder')} />
                                        <button className=" detailBtn" disabled type='submit'>
                                            {t('pages.winningBidsDetail.middleSection.left.btn')}
                                        </button>

                                    </form>

                                </div>
                                <div className="detailButtonsBottom">
                                    <div className="detailButtonsBottomLeft">
                                        <button disabled={true} className='butNow'
                                        >
                                            {t('pages.winningBidsDetail.middleSection.left.btn2')}: ${oneWinningProduct?.product && oneWinningProduct?.product[0]?.oneTimePurchase}
                                        </button>
                                        <button className="wishlistBtn" disabled  >
                                            {t('pages.winningBidsDetail.middleSection.left.btn3')}

                                        </button>
                                    </div>
                                    <ul className="detailButtonsBottomRight">
                                        <li><p> {t('pages.winningBidsDetail.middleSection.left.text')}:</p></li>
                                        <li>
                                            <div className="detailIcon">
                                                <a href="#"><FaFacebookF /></a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="detailIcon">
                                                <a href="#"><FaInstagram /></a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="detailIcon">
                                                <a href="#"><FaTwitter /></a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="detailIcon">
                                                <a href="#"><FaLinkedinIn /></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-5 col-lg-7 wow animate__animated animate__fadeInRight'>
                            <div className="productDetailMiddleRight">
                                <div className="productDetailMiddleRightTop">
                                    {
                                        oneWinningProduct?.product && oneWinningProduct?.product[0]?.type == 'electronic' ? <h5>
                                            {oneWinningProduct?.product && oneWinningProduct?.product[0]?.productName} ({oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.ramMemory} RAM, {oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.hardDiskSize} SSD Storage) - {oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.prodColor}
                                        </h5> : oneWinningProduct?.product && oneWinningProduct?.product[0]?.type == 'car' ? <h5>
                                            {oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.year} {oneWinningProduct?.product && oneWinningProduct?.product[0]?.productName} (Brand-{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.brand} ,Model-{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.model}) - {oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.color}
                                        </h5> : oneWinningProduct?.product && oneWinningProduct?.product[0]?.type == 'jewelry' ? <h5>
                                            {oneWinningProduct?.product && oneWinningProduct?.product[0]?.productName} (Metal Type-{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.metalType} , Clasp Type-{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.claspType}) - {oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.gemstoneColor}
                                        </h5> : ''
                                    }
                                    <div className="productDetailRating">
                                        <Rating name="read-only" value={5} readOnly />
                                    </div>
                                    <div className="productDetailLeftPrice">
                                        <div className="productDetailLeftPriceLeft">
                                            <p> {t('pages.winningBidsDetail.middleSection.right.text1')}:</p>
                                            <h4>${oneWinningProduct?.product && oneWinningProduct?.product[0]?.afterPrice}</h4>
                                        </div>
                                        <div className="productDetailLeftPriceRight">
                                            <div className="detailIncreaseDecrease">
                                                <button disabled className='decreaseDetail'

                                                >-</button>
                                                <input type="text"
                                                    value={0}
                                                    min="0" className='counterDetail' />
                                                <button className='increaseDetail' disabled>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productDetailLeftAbout">
                                        <h5 >
                                            {t('pages.winningBidsDetail.middleSection.right.text2')}

                                        </h5>
                                        {
                                            oneWinningProduct?.product && oneWinningProduct?.product[0]?.type == 'electronic' ? <ul className="detailAboutLeft">
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span1')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.prodBrand}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span2')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.series}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span3')}
                                                    </span>
                                                    <span className="aboutDetRight">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span4')}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span5')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.prodColor}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span6')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.hardDiskSize}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span7')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.cpuModel}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.winningBidsDetail.middleSection.right.electronicType.span8')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.ramMemory}</span>
                                                </li>
                                            </ul> :
                                                oneWinningProduct?.product && oneWinningProduct?.product[0]?.type == 'car' ? <ul className="detailAboutLeft">
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span1')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.brand}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span2')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.model}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span3')}
                                                        </span>
                                                        <span className="aboutDetRight">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span4')}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span5')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.color}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span6')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.fuel}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span7')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.year}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span8')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.condition}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span9')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.engine}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span10')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.transmission}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span11')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.mileage}miles</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.carType.span12')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.doors}</span>
                                                    </li>
                                                </ul> : oneWinningProduct?.product && oneWinningProduct?.product[0]?.type == 'jewelry' ? <ul className="detailAboutLeft">
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.winningBidsDetail.middleSection.right.jewelryType.span')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.weight}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft"> {t('pages.winningBidsDetail.middleSection.right.jewelryType.span2')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.purity}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft"> {t('pages.winningBidsDetail.middleSection.right.jewelryType.span3')}</span>
                                                        <span className="aboutDetRight"> {t('pages.winningBidsDetail.middleSection.right.jewelryType.span4')}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span5')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.gemstone}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span6')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.metalType}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span7')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.claspType}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span8')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.gemstoneColor}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span9')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.dimensions?.length}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span10')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.dimensions?.width}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">{t('pages.winningBidsDetail.middleSection.right.jewelryType.span11')}</span>
                                                        <span className="aboutDetRight">{oneWinningProduct?.product && oneWinningProduct?.product[0]?.details?.dimensions?.height}</span>
                                                    </li>
                                                </ul> : ''
                                        }

                                    </div>
                                    <div className="productDetailLeftBtn">
                                        <button disabled >
                                            {t('pages.winningBidsDetail.middleSection.right.btn')}
                                        </button>
                                    </div>
                                </div>
                                <div className="productDetailMiddleRightBottom">
                                    <p className="auctionEndP">
                                        {t('pages.winningBidsDetail.middleSection.right.text3')}:

                                    </p>
                                    <div className="endTimeBox">

                                        <ul>
                                            <li>
                                                <h3 className='text-center'>
                                                    {t('pages.winningBidsDetail.middleSection.right.text4')}
                                                </h3>
                                            </li>
                                        </ul>
                                    </div>
                                    <ul className="detailPageOdometer">
                                        <li>
                                            <div className="detailPageOdometerIcon">
                                                <img src={eye} alt="eye" />
                                            </div>
                                            <div className="detailPageOdometerRight">
                                                <div className="detailPageOdometerRightInside">
                                                    <h4 data-odometer-final={oneWinningProduct?.product && oneWinningProduct?.product[0]?.watching} className="detailOdoMeterCount odometer-auto-theme odometer1200">0</h4>
                                                    <p>
                                                        {t('pages.winningBidsDetail.middleSection.right.text5')}
                                                    </p>
                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <div className="detailPageOdometerIcon">
                                                <img src={detailbd} alt="detailbd" />
                                            </div>
                                            <div className="detailPageOdometerRight">
                                                <div className="detailPageOdometerRightInside">
                                                    <h4 data-odometer-final={oneWinningProduct?.product && oneWinningProduct?.product[0]?.totalBids} className="odometer-auto-theme odometer1500 detailOdoMeterCount">0</h4>
                                                    <p>
                                                        {t('pages.winningBidsDetail.middleSection.right.text6')}
                                                    </p>
                                                </div>
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WinningProductDetailMiddle
