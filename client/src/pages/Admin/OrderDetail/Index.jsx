import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import OrderDetailTable from '../../../components/Admin/OrderDetailTable/Index'
const OrderDetail = () => {
    return (
        <main className='ordersAdmin'>
            <Helmet>
                <title>Orders Detail</title>
            </Helmet>
            <div className="ordersAdminInside">
                <OrderDetailTable />
            </div>
        </main>
    )
}

export default OrderDetail
