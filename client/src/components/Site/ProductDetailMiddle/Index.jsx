import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
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
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, addToWishlist, removeFromBasket } from '../../../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { useDataContext } from '../../../context/context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { deleteProduct, getOneProducts, increaseAfterPrice } from '../../../redux/slices/producSlice';
import { getAllProductBids, postBids } from '../../../redux/slices/bidHistorySlice';
import { postWinningProducts } from '../../../redux/slices/winningProductSlice';
import { useTranslation } from 'react-i18next';
const ProductDetailMiddle = ({ loading }) => {
    const { t } = useTranslation()

    const { handleOpenLoginModal, setNotification, notification, } = useDataContext()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [values, setValues] = useState(0)
    const { userToken, users } = useSelector(state => state.users)
    const { oneProduct } = useSelector(state => state.products)
    const { bidHistory } = useSelector(state => state.bidHistory)

    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken?.isLogin === true) {
            if (Number(oneProduct?.oneTimePurchase) < Number(oneProduct?.afterPrice)) {
                const filterBasket = userToken?.basket?.find(prod => prod._id === oneProduct?._id)
                if (filterBasket) {
                    dispatch(removeFromBasket({ id: filterBasket?._id }));

                    const productPrice = Number(oneProduct?.afterPrice);
                    setNotification({
                        message: (
                            <div>
                                <div>
                                    <strong>Item Removed From Your Basket</strong>
                                </div>
                                <div>
                                    The one-time purchase price is now ${productPrice}.
                                </div>
                            </div>
                        ),
                        options: {
                            position: "end-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        },
                    });
                }
            }
        }
    }, [dispatch, oneProduct, userToken]);

    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer12'),
            value: 0,
            format: '(,ddd)',
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 880) {
                odometer.update(oneProduct?.watching);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [oneProduct]);
    useEffect(() => {
        const odometer = new Odometer({
            el: document.querySelector('.odometer15'),
            value: 0,
            format: '(,ddd)',
        });


        odometer.update(oneProduct?.totalBids);
    }, [oneProduct]);
    // const Completionist = () => <span>You are good to go!</span>;

    // const renderer = ({ days, hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //         return <Completionist />;
    //     } else {

    //         const totalHours = days * 24 + hours;
    // return <ul>
    //     <li>
    //         <h3 className="hoursEndTime">{totalHours}</h3>
    //     </li>
    //     <li>
    //         <h3 className="minutesEndTime">{minutes}</h3>
    //     </li>
    //     <li>
    //         <h3 className="secondEndTime">{seconds}</h3>
    //     </li>
    // </ul>


    //     }
    // };

    // const calculateTimeRemaining = (startTime, endTime) => {
    //     const currentTime = Date.now();
    //     const startTimeObject = new Date(startTime);
    //     const endTimeObject = new Date(endTime);
    //     // .toLocaleString('az-AZ')
    //     const timeRemaining = Math.max(0, endTimeObject - Math.max(currentTime, startTimeObject));

    //     const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    //     return { days, hours, minutes, seconds, completed: timeRemaining === 0 };
    // };
    const inputValueRef = useRef()

    const formik = useFormik({
        initialValues: {
            addedBid: '',
            bidderId: ''
        },
        validationSchema: Yup.object({
            addedBid: Yup.number()
                .min(oneProduct?.minimumBidPrice, ` ${t('pages.productDetail.middleSection.right.minBidText')}${oneProduct?.minimumBidPrice}`)
        }),
        onSubmit: async (values) => {
            try {

                if (userToken?.isLogin == true) {
                    const userName = `${userToken?.firstName} ${userToken?.lastName}`
                    const postedData = {
                        bidHistoryProfImage: userToken?.profileImage,
                        bidHistoryProductImage: oneProduct?.productImages[0],
                        productBidPrice: values.addedBid,
                        bidderName: userName,
                        prodId: oneProduct?._id,
                        usersId: userToken?.id

                    }
                    const response = await dispatch(postBids(postedData))
                    if (response != undefined) {
                        await dispatch(increaseAfterPrice({ id: oneProduct?._id, newData: { addedBid: Number(values.addedBid), bidderId: userToken?.id } }))
                        await dispatch(getOneProducts(oneProduct?._id))
                        formik.resetForm()
                        toast.success(t('pages.productDetail.middleSection.right.bidAddSuccessMessage1'))
                    }

                } else {
                    toast.error(t('pages.productDetail.middleSection.right.bidAddErrorMessage1'))
                    formik.resetForm()

                    handleOpenLoginModal()
                }

            } catch (err) {
                console.log(err)
            }

        },
    });
    // const handleCompleteCount = async () => {
    //     if (oneProduct) {
    //         const target = users?.find(user => user._id == oneProduct?.bidderId)
    //         if (target) {
    //             const winnerName = `${target?.firstName} ${target?.lastName}`
    //             await dispatch(postWinningProducts({
    //                 winnerId: oneProduct?.bidderId,
    //                 winnerName: winnerName,
    //                 winnerGmail: target?.userGmail,
    //                 product: oneProduct,
    //                 productBidders: bidHistory

    //             }
    //             ))

    //             // setTimeout(() => {
    //             //      dispatch(deleteProduct(oneProduct?._id))
    //             // }, 2000);
    //         }
    //     }


    // }


    const AuctionTimer = ({ startTime, endTime }) => {
        const calculateTimeRemaining = (startTime, endTime) => {
            const currentTime = Date.now();
            const startTimeObject = new Date(startTime);
            const endTimeObject = new Date(endTime);

            const timeRemaining = Math.max(0, endTimeObject - Math.max(currentTime, startTimeObject));

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds, completed: timeRemaining === 0 };
        };

        const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(startTime, endTime));

        useEffect(() => {
            const timerInterval = setInterval(() => {
                const newTimeRemaining = calculateTimeRemaining(startTime, endTime);
                setTimeRemaining(newTimeRemaining);

                if (newTimeRemaining.completed) {
                    clearInterval(timerInterval);
                    handleWinningProduct();
                }
            }, 1000);

            return () => clearInterval(timerInterval);
        }, [startTime, endTime]);

        const formatTime = (time) => {
            const totalHours = time.days * 24 + time.hours;

            return <ul>
                <li>
                    <h3 className="hoursEndTime">{totalHours}</h3>
                </li>
                <li>
                    <h3 className="minutesEndTime">{time.minutes}</h3>
                </li>
                <li>
                    <h3 className="secondEndTime">{time.seconds}</h3>
                </li>
            </ul>

        };

        const handleWinningProduct = () => {
            if (oneProduct) {
                const target = users?.find(user => user._id == oneProduct?.bidderId)
                if (target) {
                    const winnerName = `${target?.firstName} ${target?.lastName}`
                    dispatch(postWinningProducts({
                        winnerId: oneProduct?.bidderId,
                        winnerName: winnerName,
                        winnerGmail: target?.userGmail,
                        product: oneProduct,
                        productBidders: bidHistory

                    }
                    ))

                    setTimeout(() => {
                        dispatch(deleteProduct(oneProduct?._id))
                    }, 80);
                }
            }
        };

        return (
            <>
                {formatTime(timeRemaining)}</>
        );
    };





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
                                            oneProduct?.productImages?.map((item, index) => {
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
                                                oneProduct?.productImages?.map((item, index) => {
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
                                        {oneProduct?.productName}
                                    </h3>
                                    <ul>
                                        <li>
                                            <h5 className="aboutPriceTitle">

                                                {
                                                    t('pages.productDetail.middleSection.left.h5')
                                                }

                                            </h5>
                                            <h4 className="bluePrice">
                                                US ${oneProduct?.afterPrice}
                                            </h4>
                                        </li>
                                        <li>
                                            <p className="detailAboutPriceP">

                                                {
                                                    t('pages.productDetail.middleSection.left.p1')
                                                }
                                            </p>
                                            <h5 className="detailAboutPriceH">
                                                20.00%

                                            </h5>
                                        </li>
                                        <li>
                                            <p className="detailAboutPriceP">

                                                {
                                                    t('pages.productDetail.middleSection.left.p2')
                                                }


                                            </p>
                                            <h5 className="detailAboutPriceH">
                                                ${oneProduct?.minimumBidPrice}

                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                                <div className="detailPriceInput">
                                    <form action="#" onSubmit={formik.handleSubmit}>
                                        <input value={formik.values.addedBid} name='addedBid' onChange={formik.handleChange} type="text" placeholder=
                                            {
                                                t('pages.productDetail.middleSection.left.placeholder')
                                            } />
                                        <button className="detailBtn" type='submit'>

                                            {
                                                t('pages.productDetail.middleSection.left.btn')
                                            }
                                        </button>

                                    </form>
                                    {formik.touched.addedBid && formik.errors.addedBid ? (
                                        <small style={{ color: "red" }}>{formik.errors.addedBid}</small>
                                    ) : null}
                                </div>
                                <div className="detailButtonsBottom">
                                    <div className="detailButtonsBottomLeft">
                                        <button disabled={Number(oneProduct?.oneTimePurchase) < Number(oneProduct?.afterPrice)} className='butNow' onClick={async () => {
                                            if (userToken.isLogin == true) {
                                                const filterBasket = userToken?.basket.some(item => item._id == oneProduct?._id)
                                                if (filterBasket) {
                                                    toast.error(t('pages.productDetail.middleSection.left.basketErrorText1'))
                                                } else {
                                                    await dispatch(addToBasket({ id: oneProduct?._id }))
                                                    toast.success(t('pages.productDetail.middleSection.left.basketSuccessMessage'))
                                                }
                                            } else {
                                                toast.error(t('pages.productDetail.middleSection.left.basketErrorText2'))

                                                handleOpenLoginModal()
                                            }
                                        }}>

                                            {
                                                t('pages.productDetail.middleSection.left.btn2')
                                            }: ${oneProduct?.oneTimePurchase}
                                        </button>
                                        <button className="wishlistBtn" onClick={async () => {
                                            if (userToken.isLogin == true) {
                                                const filterWishlist = userToken?.wishlist.some(item => item._id == oneProduct?._id)
                                                if (filterWishlist) {
                                                    toast.error(t('pages.productDetail.middleSection.left.wishlistErrorMessage1'))

                                                } else {
                                                    await dispatch(addToWishlist({ id: oneProduct?._id }))
                                                    toast.success(t('pages.productDetail.middleSection.left.wishlistSuccessMessage'))
                                                }
                                            } else {
                                                toast.error(t('pages.productDetail.middleSection.left.wishlistErrorMessage2'))

                                                handleOpenLoginModal()
                                            }

                                        }}>


                                            {
                                                t('pages.productDetail.middleSection.left.btn3')
                                            }
                                        </button>
                                    </div>
                                    <ul className="detailButtonsBottomRight">
                                        <li><p>
                                            {
                                                t('pages.productDetail.middleSection.left.text')
                                            }:</p></li>
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
                                        oneProduct?.type == 'electronic' ? <h5>
                                            {oneProduct?.productName} ({oneProduct?.details?.ramMemory} RAM, {oneProduct?.details?.hardDiskSize} SSD Storage) - {oneProduct?.details?.prodColor}
                                        </h5> : oneProduct?.type == 'car' ? <h5>
                                            {oneProduct?.details?.year} {oneProduct?.productName} (Brand-{oneProduct?.details?.brand} ,Model-{oneProduct?.details?.model}) - {oneProduct?.details?.color}
                                        </h5> : oneProduct?.type == 'jewelry' ? <h5>
                                            {oneProduct?.productName} (Metal Type-{oneProduct?.details?.metalType} , Clasp Type-{oneProduct?.details?.claspType}) - {oneProduct?.details?.gemstoneColor}
                                        </h5> : ''
                                    }
                                    <div className="productDetailRating">
                                        <Rating name="read-only" value={5} readOnly />
                                    </div>
                                    <div className="productDetailLeftPrice">
                                        <div className="productDetailLeftPriceLeft">
                                            <p>{t('pages.productDetail.middleSection.right.text1')}:</p>
                                            <h4>${oneProduct?.afterPrice}</h4>
                                        </div>
                                        <div className="productDetailLeftPriceRight">
                                            <div className="detailIncreaseDecrease">
                                                <button disabled={values == 0} className='decreaseDetail'
                                                    onClick={() => {
                                                        setValues(values - oneProduct?.minimumBidPrice)
                                                    }}
                                                >-</button>
                                                <input type="text"
                                                    value={values}
                                                    min="0" className='counterDetail' />
                                                <button className='increaseDetail' onClick={() => {
                                                    setValues(values + oneProduct?.minimumBidPrice)
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="productDetailLeftAbout">
                                        <h5 >
                                            {t('pages.productDetail.middleSection.right.text2')}
                                        </h5>
                                        {
                                            oneProduct?.type == 'electronic' ? <ul className="detailAboutLeft">
                                                <li>
                                                    <span className="aboutDetLeft">
                                                        {t('pages.productDetail.middleSection.right.electronicType.span1')}
                                                    </span>
                                                    <span className="aboutDetRight">{oneProduct?.details?.prodBrand}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">  {t('pages.productDetail.middleSection.right.electronicType.span2')}</span>
                                                    <span className="aboutDetRight">{oneProduct?.details?.series}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">  {t('pages.productDetail.middleSection.right.electronicType.span3')}</span>
                                                    <span className="aboutDetRight">  {t('pages.productDetail.middleSection.right.electronicType.span4')}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">  {t('pages.productDetail.middleSection.right.electronicType.span5')}</span>
                                                    <span className="aboutDetRight">{oneProduct?.details?.prodColor}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">  {t('pages.productDetail.middleSection.right.electronicType.span6')}</span>
                                                    <span className="aboutDetRight">{oneProduct?.details?.hardDiskSize}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">  {t('pages.productDetail.middleSection.right.electronicType.span7')}</span>
                                                    <span className="aboutDetRight">{oneProduct?.details?.cpuModel}</span>
                                                </li>
                                                <li>
                                                    <span className="aboutDetLeft">  {t('pages.productDetail.middleSection.right.electronicType.span8')}</span>
                                                    <span className="aboutDetRight">{oneProduct?.details?.ramMemory}</span>
                                                </li>
                                            </ul> :
                                                oneProduct?.type == 'car' ? <ul className="detailAboutLeft">
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span1')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.brand}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span2')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.model}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span3')}
                                                        </span>
                                                        <span className="aboutDetRight">
                                                            {t('pages.productDetail.middleSection.right.carType.span4')}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span5')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.color}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span6')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.fuel}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span7')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.year}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span8')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.condition}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span9')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.engine}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span10')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.transmission}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span11')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.mileage}miles</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.carType.span12')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.doors}</span>
                                                    </li>
                                                </ul> : oneProduct?.type == 'jewelry' ? <ul className="detailAboutLeft">
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span1')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.weight}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span2')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.purity}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span3')}
                                                        </span>
                                                        <span className="aboutDetRight">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span4')}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span5')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.gemstone}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span6')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.metalType}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span7')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.claspType}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span8')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.gemstoneColor}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span9')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.dimensions?.length}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span10')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.dimensions?.width}</span>
                                                    </li>
                                                    <li>
                                                        <span className="aboutDetLeft">
                                                            {t('pages.productDetail.middleSection.right.jewelryType.span11')}
                                                        </span>
                                                        <span className="aboutDetRight">{oneProduct?.details?.dimensions?.height}</span>
                                                    </li>
                                                </ul> : ''
                                        }

                                    </div>
                                    <div className="productDetailLeftBtn">
                                        <button disabled={values == 0} onClick={async () => {
                                            if (userToken?.isLogin == true) {
                                                const userName = `${userToken?.firstName} ${userToken?.lastName}`
                                                const postedData = {
                                                    bidHistoryProfImage: userToken?.profileImage,
                                                    bidHistoryProductImage: oneProduct?.productImages[0],
                                                    productBidPrice: values,
                                                    bidderName: userName,
                                                    prodId: oneProduct?._id,
                                                    usersId: userToken?.id

                                                }
                                                const response = await dispatch(postBids(postedData))
                                                if (response != undefined) {
                                                    await dispatch(increaseAfterPrice({ id: oneProduct?._id, newData: { addedBid: values, bidderId: userToken?.id } }))
                                                    await dispatch(getOneProducts(oneProduct?._id))

                                                    setValues(0)
                                                    toast.success(t('pages.productDetail.middleSection.right.bidAddSuccessMessage'))
                                                }
                                            } else {
                                                toast.error(t('pages.productDetail.middleSection.right.bidAddErrorMessage'))
                                                setValues(0)
                                                handleOpenLoginModal()
                                            }


                                        }}>
                                            {t('pages.productDetail.middleSection.right.btn')}
                                        </button>
                                    </div>
                                </div>
                                <div className="productDetailMiddleRightBottom">
                                    <p className="auctionEndP">
                                        {t('pages.productDetail.middleSection.right.text3')}:

                                    </p>
                                    <div className="endTimeBox">


                                        <AuctionTimer startTime={oneProduct?.startTime} endTime={oneProduct?.endTime} />
                                    </div>
                                    <ul className="detailPageOdometer">
                                        <li>
                                            <div className="detailPageOdometerIcon">
                                                <img src={eye} alt="eye" />
                                            </div>
                                            <div className="detailPageOdometerRight">
                                                <div className="detailPageOdometerRightInside">
                                                    <h4 data-odometer-final={oneProduct?.watching} className="detailOdoMeterCount odometer-auto-theme odometer12">0</h4>
                                                    <p>
                                                        {t('pages.productDetail.middleSection.right.text5')}
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
                                                    <h4 data-odometer-final={oneProduct?.totalBids} className="odometer-auto-theme odometer15 detailOdoMeterCount">0</h4>
                                                    <p>
                                                        {t('pages.productDetail.middleSection.right.text6')}

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

export default ProductDetailMiddle
