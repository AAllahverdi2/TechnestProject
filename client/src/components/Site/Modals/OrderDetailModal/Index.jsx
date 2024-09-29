import React, { useRef, useState } from 'react'
import './Index.scss'
import bidNm from '../../../../assets/bidNm.png'
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useDataContext } from '../../../../context/context';
import { Link } from 'react-router-dom';
const OrderDetailModal = () => {
    const { openOrderDetailRef, handleOpenOrderDetail, handleCloseOrderDetail } = useDataContext()

    const dispatch = useDispatch()
    const { userToken } = useSelector(state => state.users)
    const { oneOrder } = useSelector(state => state.orders)

    let basketTotalPrice = 0
    let basketTotalAmount = userToken?.basket?.length

    return (
        <div className='orderDetailForm' ref={openOrderDetailRef}>
            <div className="orderDetailFormBox">
                <div className="closeBtn" onClick={handleCloseOrderDetail}>
                    <IoClose />

                </div>
                <div className="orderDetailFormBoxInside">
                    <div className="orderDetailFormInsideTop">
                        <h4>
                            Order Details
                        </h4>

                    </div>
                    <div className="orderDetailFormInsideBottom" >
                        <div className="checkOutItemH4">
                            <h4>Your Information</h4>
                        </div>
                        <div className="checkOutItem">
                            <p className="checkoutTotalPrice">
                                Full Name: <span>{oneOrder?.orderFirstName} {oneOrder?.orderLastName}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Gmail: <span>{oneOrder?.orderGmail}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Phone: <span>{oneOrder?.orderPhone}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Address: <span>{oneOrder?.orderAddress}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Apartments: <span>{oneOrder?.orderApartments}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                City: <span>{oneOrder?.orderCity}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Country: <span>{oneOrder?.orderCountry}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Status: <span style={{
                                    color:
                                        oneOrder?.orderStatus == 'Pending' ? 'yellow' :
                                            oneOrder?.orderStatus == 'Accept' ? 'green' :
                                                oneOrder?.orderStatus == 'Reject' ? 'red' : ''
                                }}>{oneOrder?.orderStatus}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Total Price: <span>${oneOrder?.orderTotalPrice}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Total Amount: <span>{oneOrder?.orderTotalAmount}</span>
                            </p>
                        </div>


                        <div className="checkOutItemH4 mt-3">
                            <h4>Your Products</h4>
                        </div>
                        <div className="checkOutItem">
                            <div className="row">

                                {
                                    oneOrder?.items?.map((item, index) => {
                                        return <div key={index} className="col-md-12">
                                            <div className=" checkOutCards mb-3">
                                                <div className="checkOutCardsLeft">
                                                    <img src={item.productImages.length > 0 ? `http://localhost:5050/public/${item.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />

                                                    <Link
                                                        onClick={async () => {
                                                            window.scrollTo({
                                                                top: 0,
                                                                behavior: 'smooth'
                                                            });
                                                        }} to={`/product/${item._id}`}
                                                        className='details2'>
                                                        <img src={bidNm} alt="bid" />
                                                    </Link>
                                                </div>
                                                <div className="checkOutCardsRight">
                                                    <h5>

                                                        <Link onClick={async () => {
                                                            window.scrollTo({
                                                                top: 0,
                                                                behavior: 'smooth'
                                                            });
                                                        }} to={`/product/${item._id}`} >
                                                            {item.productName}
                                                        </Link>
                                                    </h5>
                                                    <div className="checkOutCardsRightMiddle">
                                                        <div className="checkOutCardsRightLeft">
                                                            <h6>
                                                                price
                                                            </h6>

                                                            <h6 className="price2">${item.oneTimePurchase}</h6>
                                                        </div>
                                                        <div className="checkOutCardsRightRight">
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

                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailModal
