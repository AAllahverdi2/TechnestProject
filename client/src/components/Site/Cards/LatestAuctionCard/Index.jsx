import React, { useEffect, useState } from 'react'
import './Index.scss'
import exampleImage from '../../../../assets/exampleImage.png'
import bidNm from '../../../../assets/bidNm.png'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getOneProducts, updateProdIncreament } from '../../../../redux/slices/producSlice'
import Countdown from 'react-countdown'
import Icon from '@mdi/react'
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit } from '@mdi/js'
import { removeFromWishlist } from '../../../../redux/slices/userSlice'
import toast from 'react-hot-toast'
import { useDataContext } from '../../../../context/context'
import { postWinningProducts } from '../../../../redux/slices/winningProductSlice'
const LatestAuctionCard = ({ item, index }) => {
    const location = useLocation()
    const { bidHistory } = useSelector(state => state.bidHistory)

    const dispatch = useDispatch()
    const { handleOpenProductUpdate } = useDataContext()
    const { userToken, users } = useSelector(state => state.users)
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

            return <ul className="times">
                <li><span className="hours">{totalHours}h</span></li>
                <li><span className="minutes">{time.minutes}m</span></li>
                <li><span className="seconds">{time.seconds}s</span></li>
            </ul>

        };

        const handleWinningProduct = () => {
            if (item) {
                const target = users?.find(user => user._id == item?.bidderId)
                if (target) {
                    const winnerName = `${target?.firstName} ${target?.lastName}`
                    dispatch(postWinningProducts({
                        winnerId: item?.bidderId,
                        winnerName: winnerName,
                        winnerGmail: target?.userGmail,
                        product: item,
                        productBidders: bidHistory

                    }
                    ))

                    setTimeout(() => {
                        dispatch(deleteProduct(item?._id))
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
        <div className={`auctionCardInside  ${location.pathname == '/product' || location.pathname == "/myFavorites" ? "productPageHover" : ""}`}>
            <div className="auctionCardInsideTop">
                <img src={item.productImages.length > 0 ? `http://localhost:5050/public/${item.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />
                <Link onClick={async () => {
                    await dispatch(updateProdIncreament(item._id))
                    await dispatch(getOneProducts(item?._id))

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }} to={`/product/${item._id}`} className='details'>
                    <img src={bidNm} alt="bid" />
                </Link>

                <div style={{
                    display: location.pathname == '/myFavorites' || location.pathname == '/myProducts' && userToken?.isLogin == true ? "" : 'none'
                }} className="auctionCardInsideBtn2">
                    <button title={
                        location.pathname == '/myFavorites' ? 'Delete From Favorites' :
                            location.pathname == '/myProducts' ? 'Delete Product' : ''
                    } className='deleteBtnInTestimonials' onClick={async () => {
                        const filterWishlist = userToken?.wishlist?.find(prod => prod._id == item?._id)
                        if (location.pathname == '/myFavorites') {

                            if (!filterWishlist) {
                                toast.error("You Don't Have This Item In Your Wishlist")

                            } else {
                                await dispatch(removeFromWishlist({ id: filterWishlist?._id }))
                                toast.success('Product Deleted From Your Wishlist')
                            }
                        } else if (location.pathname == '/myProducts') {
                            await dispatch(removeFromWishlist({ id: filterWishlist?._id }))
                            setTimeout(async () => {
                                await dispatch(deleteProduct(item._id))
                            }, 500);

                            toast.success('Product Successfully Deleted');
                        }
                    }}>
                        <span className='testimonialFirstDelete'>
                            <Icon path={mdiDelete} size={1} />
                        </span>
                        <span className='testimonialSecondDelete'>
                            <Icon path={mdiDeleteEmpty} size={1} />

                        </span>
                    </button>
                    <button style={{ display: location.pathname == '/myProducts' ? '' : 'none' }} className='deleteBtnInTestimonials mt-2' onClick={async () => {
                        await dispatch(getOneProducts(item?._id))

                        handleOpenProductUpdate()
                    }}>
                        <Icon path={mdiFileEdit} size={1} />

                    </button>
                </div>
            </div>
            <div className="auctionCardInsideBottom">
                <h5>

                    <Link onClick={async () => {
                        await dispatch(updateProdIncreament(item._id))
                        await dispatch(getOneProducts(item?._id))
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} to={`/product/${item._id}`} >
                        {item?.productName}
                    </Link>
                </h5>
                <div className="auctionCardInsideBottomInside">
                    <div className="auctionCardBottomLeft">
                        <h6>
                            Current Bid:
                        </h6>
                        <h6 className="auctionCardPrice">

                            ${item.afterPrice} (USD)

                        </h6>
                    </div>
                    <div className="auctionCardBottomRight">
                        <h6>
                            Ends In:
                        </h6>
                        {/* <Countdown
                            // onComplete={handleCompleteCount}
                            date={new Date(item.endTime)}
                            renderer={(props) => renderer({ ...props, ...calculateTimeRemaining(item.startTime, item.endTime) })}
                        /> */}
                        <AuctionTimer startTime={item?.startTime} endTime={item?.endTime} />


                    </div>
                </div>

                <div className="auctionCardInsideBtn">
                    <Link onClick={async () => {
                        await dispatch(updateProdIncreament(item._id))
                        await dispatch(getOneProducts(item?._id))

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} to={`/product/${item._id}`} className='blueBtn auctionCardBtn'>
                        Submit A Bid
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default LatestAuctionCard
