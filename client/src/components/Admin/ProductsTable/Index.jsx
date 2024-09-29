import React, { useState } from 'react'
import './Index.scss'
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";
import { Pagination } from '@mui/material';
import QuestionsTableItem from '../QuestionsTableItem/Index';
import ProductsTableItem from '../ProductsTableItem/Index';
const ProductsTable = () => {
    const { products, productLoading } = useSelector(state => state.products)
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className='container'>
            <div className="row">
                {
                    productLoading == true ? <p className='productsSpinner'>
                        <RingLoader color="#36d7b7" />
                    </p> : <div className='col-lg-12 productsTableCol'>
                        <div className="productsTableColInside">
                            <div className="productsTableColInsideBox">
                                <div className="resProductsTable">
                                    <table className='table table-hover' >
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Image</th>
                                                <th>Product Name </th>
                                                <th>Current Bid </th>
                                                <th>End Time </th>
                                                <th>Detail</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems?.map((item, index) => {
                                                    return <ProductsTableItem key={index} index={indexOfFirstItem + index} item={item} />
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <div className="productPagination" style={{ display: products.length > 7 ? "" : "none" }}>
                                        <Pagination
                                            count={Math.ceil(products.length / itemsPerPage)}
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

export default ProductsTable
