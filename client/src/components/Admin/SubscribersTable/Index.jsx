import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import SubscribersTableItem from '../SubscribersTableItem/Index';
const SubscribersTable = () => {
    const { subscribers, loading } = useSelector(state => state.subscribers)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = subscribers?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    loading == true ? <p className='subscribersSpinner'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 subscribersTableCol'>
                        <div className="subscribersTableColInside">
                            <div className="subscribersTableColInsideBox">
                                <div className="resSubscribes">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Gmail</th>
                                                <th>Posted Day</th>
                                                <th>Posted Time</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <SubscribersTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>


                                </div>
                                <div className="subscribersPagination" style={{ display: subscribers.length > 7 ? "" : "none" }}>
                                    <Pagination
                                        count={Math.ceil(subscribers.length / itemsPerPage)}
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

export default SubscribersTable
