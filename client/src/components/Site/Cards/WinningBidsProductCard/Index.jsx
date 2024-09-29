import React from 'react'
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
import { getOneWinningProducts } from '../../../../redux/slices/winningProductSlice'
const WinningBidsProductCard = ({ item, index, prod }) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { handleOpenProductUpdate } = useDataContext()
    const { userToken } = useSelector(state => state.users)

    return (
        <div className={`winProdCard  ${location.pathname == '/product' || location.pathname == "/myFavorites" ? "productPageHover" : ""}`}>
            <div className="winProdCardTop">
                <img src={item?.productImages?.length > 0 ? `http://localhost:5050/public/${item?.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />
                <Link onClick={async () => {
                    await dispatch(getOneWinningProducts(prod?._id))

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }} to={`/winningBids/${prod._id}`} className='details'>
                    <img src={bidNm} alt="bid" />
                </Link>


            </div>
            <div className="wingProductBottom">
                <h5>

                    <Link onClick={async () => {

                        await dispatch(getOneWinningProducts(prod?._id))

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} to={`/winningBids/${prod._id}`} >
                        {item?.productName}
                    </Link>
                </h5>
                <div className="wingProductBottomInside">
                    <div className="wingProductBottomInsideLeft">
                        <h6>
                            Current Bid:
                        </h6>
                        <h6 className="auctionCardPrice">

                            ${item.afterPrice} (USD)

                        </h6>
                    </div>
                    <div className="winningProductBottomInsideRight">
                        <h6>
                            Ends In:
                        </h6>
                        <p className='congratulations'>
                            🎉 "Congratulations on your victory! 🎊"
                        </p>

                    </div>
                </div>

                <div className="winningProductBtnInside">
                    <Link onClick={async () => {
                        await dispatch(getOneWinningProducts(prod?._id))

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} to={`/winningBids/${prod._id}`} className='blueBtn winningProductBtn2'>
                        GO TO DETAIL
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default WinningBidsProductCard
