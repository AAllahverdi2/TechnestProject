import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import ManagementTableItem from '../ManagementTableItem/Index';

const ManagementTable = () => {
    const { management, managementLoading } = useSelector(state => state.management)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = management?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    managementLoading == true ? <p className='spinnerManagement'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 managementTableCol'>
                        <div className="managementTableColInside">
                            <div className="managementTableColInsideBox">
                                <div className="resManagementTable">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Image</th>
                                                <th>Management Title</th>
                                                <th>Management Profession</th>
                                                <th>Detail</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <ManagementTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>


                                </div>
                                <div className="managementPagination" style={{ display: management.length > 7 ? "" : "none" }}>
                                    <Pagination
                                        count={Math.ceil(management.length / itemsPerPage)}
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

export default ManagementTable
