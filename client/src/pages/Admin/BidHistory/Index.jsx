import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import BidHistoryTableTop from '../../../components/Admin/BidHistoryTableTop/Index'
import BiddersTable from '../../../components/Admin/BiddersTabel/Index'
const BidHistory = () => {
    return (
        <main className='bidHistory'>
            <Helmet>
                <title>Bid History</title>
            </Helmet>
            <div className="bidHistoryAdmin">
                <BidHistoryTableTop />
                <BiddersTable />
            </div>
        </main>
    )
}

export default BidHistory
