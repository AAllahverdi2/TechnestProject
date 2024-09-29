import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import WinnerTop from '../../../components/Admin/WinnersTop/Index'
import WinnerTable from '../../../components/Admin/WinnerTable/Index'
const Winners = () => {
    return (
        <main className='WinnersAdmin'>
            <Helmet>
                <title>Winners</title>
            </Helmet>
            <div className="WinnersAdminInside">
                <WinnerTop />
                <WinnerTable />
            </div>
        </main>
    )
}

export default Winners
