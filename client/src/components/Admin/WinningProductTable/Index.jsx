import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import WinningProductTableItem from '../WinningProductTableItem/Index';
const WinningProductTable = () => {
    const { winningProduct, loading } = useSelector(state => state.winningProducts)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = winningProduct?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    loading == true ? <p className='winningProductSpinner'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 winProductCol'>
                        <div className="winProductColInside">
                            <div className="winProductColInsideBox">
                                <div className="resWinningProductTable">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Product Image</th>
                                                <th>Winner Title</th>
                                                <th>Price</th>
                                                <th>Ended</th>
                                                <th>Detail</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <WinningProductTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <div className="winningProductPagination" style={{ display: winningProduct.length > 7 ? "" : "none" }}>
                                        <Pagination
                                            count={Math.ceil(winningProduct.length / itemsPerPage)}
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

export default WinningProductTable
