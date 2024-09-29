import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import OrderTableItem from '../OrderTableItem/Index';

const OrderTable = () => {
    const { orders, loading } = useSelector(state => state.orders)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    loading == true ? <p className='orderSpinner'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 orderTableCol'>
                        <div className="orderTableColInside">
                            <div className="orderTableColInsideBox">
                                <div className="resOrderTable">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>User Title</th>
                                                <th>User Gmail</th>
                                                <th>Total Amount</th>
                                                <th>Total Price</th>
                                                <th>Status</th>
                                                <th>Info</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <OrderTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>


                                </div>
                                <div className="orderPagination" style={{ display: orders.length > 7 ? "" : "none" }}>
                                    <Pagination
                                        count={Math.ceil(orders.length / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default OrderTable
