import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import BiddersTableItem from '../BiddersTableItem/Index';
const BiddersTable = () => {
    const { bidHistory, loading } = useSelector(state => state.bidHistory)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bidHistory?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    loading == true ? <p className='bidHistorySpinner'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 bidHisCol'>
                        <div className="bidHisColInside">
                            <div className="bidHisColInsideBox">
                                <div className="resBidHistory">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Image</th>
                                                <th>Bidders</th>
                                                <th>Bidders Added Price</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <BiddersTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <div className="bidHistory" style={{ display: bidHistory.length > 7 ? "" : "none" }}>
                                        <Pagination
                                            count={Math.ceil(bidHistory.length / itemsPerPage)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default BiddersTable
