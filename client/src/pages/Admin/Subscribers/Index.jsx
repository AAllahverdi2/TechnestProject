import React from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import SubscribersTop from '../../../components/Admin/SubscribersTop/Index'
import SubscribersTable from '../../../components/Admin/SubscribersTable/Index'
const Subscribers = () => {
    return (
        <main className='subscribers'>
            <Helmet>
                <title>Subscribers</title>
            </Helmet>
            <div className="subscribersAdmin">
                <SubscribersTop />
                <SubscribersTable />
            </div>
        </main>
    )
}

export default Subscribers
