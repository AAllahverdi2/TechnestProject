import React from 'react'
import './Index.scss'
import bidNm from '../../../../assets/bidNm.png'
import { Link } from "react-router-dom"
import exampleImage from '../../../../assets/exampleImage.png'
import { getOneProducts, updateProdIncreament } from '../../../../redux/slices/producSlice'
import { useDispatch } from 'react-redux'
import Countdown from 'react-countdown'
const UpcomingCard = ({ item, index }) => {
    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            const totalHours = days * 24 + hours;
            return <ul className="times">
                <li><span className="hours">{totalHours}h</span></li>
                <li><span className="minutes">{minutes}m</span></li>
                <li><span className="seconds">{seconds}s</span></li>
            </ul>

        }
    };

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

    const dispatch = useDispatch()
    return (
        <div className="upcomingAuctionCard">
            <div className="upcomingAuctionCardLeft">
                <img src={item.productImages.length > 0 ? `http://localhost:5050/public/${item.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />

                <Link
                    onClick={async () => {
                        await dispatch(updateProdIncreament(item._id))
                        await dispatch(getOneProducts(item?._id))

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} to={`/product/${item._id}`}
                    className='details2'>
                    <img src={bidNm} alt="bid" />
                </Link>
            </div>
            <div className="upcomingAuctionCardRight">
                <h5>

                    <Link onClick={async () => {
                        await dispatch(updateProdIncreament(item._id))
                        await dispatch(getOneProducts(item?._id))

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} to={`/product/${item._id}`} >
                        {item.productName}
                    </Link>
                </h5>
                <div className="upcomingAuctionCardRightMiddle">
                    <div className="upcomingCardLeft">
                        <h6>
                            price
                        </h6>

                        <h6 className="price2">${item.afterPrice}</h6>
                    </div>
                    <div className="upcomingCardRight">
                        <h6>
                            Product Type:
                        </h6>
                        <h6 className="aucId">
                            {
                                item.type == 'electronic' ? 'Electronic' :
                                    item.type == 'car' ? 'Car' :
                                        item.type == 'jewelry' ? 'Jewelry' : ''
                            }
                        </h6>
                    </div>

                </div>
                <div className="upcomingCardBottom">
                    <h6>
                        Ends In:
                    </h6>
                    <Countdown
                        date={new Date(item.endTime)}
                        renderer={(props) => renderer({ ...props, ...calculateTimeRemaining(item.startTime, item.endTime) })}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpcomingCard
