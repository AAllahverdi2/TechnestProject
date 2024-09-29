import React, { useEffect, useState } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import OrderDetailTableItem from '../OrderDetailTableItem/Index';
import { useParams } from 'react-router';
import { getOneOrder } from '../../../redux/slices/orderSlice';
import { Link } from 'react-router-dom'


const OrderDetailTable = () => {
    const { orders, oneOrder, loading } = useSelector(state => state.orders)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneOrder(id))
    }, [id])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = oneOrder?.items?.slice(indexOfFirstItem, indexOfLastItem) || [];

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (

        <>
            {
                loading == true ? <p className='orderSpinner'>
                    <RingLoader color="#36d7b7" />
                </p> : <>

                    <div className="testimonialDetailInside mb-4" >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">

                                    <div className="testimonialDetailInsideCard">
                                        <div className="testimonialDetailCardBox">
                                            <h2 style={{ color: 'white', fontSize: '20px' }}>User  Information</h2>
                                            <div className="testimonialDetailCardTop">
                                                <div className="testimonialAbout">
                                                    <p>
                                                        User Full Name:   <span style={{ color: 'white' }}> {oneOrder?.orderFirstName}    {oneOrder?.orderLastName}</span>
                                                    </p>
                                                    <p>
                                                        Address:   <span style={{ color: 'white' }}>   {oneOrder?.orderAddress}</span>
                                                    </p>
                                                    <p >
                                                        Apartments: <span style={{ color: 'white' }}>   {oneOrder?.orderApartments}</span>
                                                    </p>

                                                    <p >
                                                        City:  <span style={{ color: 'white' }}>   {oneOrder?.orderCity}</span>
                                                    </p>
                                                    <p >
                                                        Country:  <span style={{ color: 'white' }}>   {oneOrder?.orderCountry}</span>
                                                    </p>
                                                    <p >
                                                        Total Price:  <span style={{ color: 'white' }}>   ${oneOrder?.orderTotalPrice}</span>
                                                    </p>
                                                    <p >
                                                        Total Amount:  <span style={{ color: 'white' }}>   {oneOrder?.orderTotalAmount}</span>
                                                    </p>
                                                    <p >
                                                        Phone: <span style={{ color: 'white' }}>   {oneOrder?.orderPhone}</span>
                                                    </p>
                                                    <p >
                                                        Gmail: <span style={{ color: 'white' }}>   {oneOrder?.orderGmail}</span>
                                                    </p>
                                                    <p >
                                                        Status:  <span style={{ color: 'white' }}>   {oneOrder?.orderStatus}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="goBackTestimonialBtn btn btn-dark">
                                                <Link to={'/admin/adminOrders'}>
                                                    Go Back
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="row">
                            <div className='col-lg-12 orderTableCol'>
                                <div className="orderTableColInside">
                                    <div className="orderTableColInsideBox">
                                        <h2 style={{ color: 'white', fontSize: '20px' }}>User Order Information</h2>
                                        <div className="resOrderTable">
                                            {oneOrder && oneOrder.items ? (
                                                <table className='table table-hover'>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Product Image</th>
                                                            <th>Product Title</th>
                                                            <th>Product Price</th>
                                                            <th>Type</th>
                                                            <th>Description</th>
                                                            <th>Watching</th>
                                                            <th>End Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentItems?.map((item, index) => (
                                                            <OrderDetailTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p className='orderDetail'>No orders available.</p>
                                            )}


                                        </div>
                                        <div className="orderPagination" style={{ display: currentItems.length > 7 ? "" : "none" }}>
                                            <Pagination
                                                count={Math.ceil(currentItems.length / itemsPerPage)}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                                color="primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </>


            }

        </>
    )
}

export default OrderDetailTable
