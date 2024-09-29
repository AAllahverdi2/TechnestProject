import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import CommentTableItem from '../CommentTableItem/Index';

const CommentTable = () => {
    const { comments, loading } = useSelector(state => state.comments)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = comments?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    loading == true ? <p className='spinnerManagement'>
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
                                                <th>Commented User Title</th>
                                                <th>Commented Created Time</th>
                                                <th>Detail</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <CommentTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>


                                </div>
                                <div className="managementPagination" style={{ display: comments.length > 7 ? "" : "none" }}>
                                    <Pagination
                                        count={Math.ceil(comments.length / itemsPerPage)}
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

export default CommentTable
