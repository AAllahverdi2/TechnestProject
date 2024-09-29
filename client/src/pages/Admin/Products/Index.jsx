import React from 'react'
import { Helmet } from 'react-helmet'
import ProductsTableTop from '../../../components/Admin/ProductsTableTop/Index'
import './Index.scss'
import ProductsTable from '../../../components/Admin/ProductsTable/Index'
const Products = () => {
    return (
        <main className='products'>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className="productsAdmin">
                <ProductsTableTop />
                <ProductsTable/>
            </div>
        </main>
    )
}

export default Products
