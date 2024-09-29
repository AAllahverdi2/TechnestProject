import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import OrdersTop from '../../../components/Admin/OrdersTop/Index'
import OrderTable from '../../../components/Admin/OrderTable/Index'
const Orders = () => {
    return (
        <main className='ordersAdmin'>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <div className="ordersAdminInside">
                <OrdersTop />
                <OrderTable />
            </div>
        </main>
    )
}

export default Orders
