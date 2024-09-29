import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import WinningProductsTop from '../../../components/Admin/WinningProductsTop/Index'
import WinningProductTable from '../../../components/Admin/WinningProductTable/Index'
const WinningProducts = () => {
    return (
        <main className='winningProduct'>
            <Helmet>
                <title>Winners Products</title>
            </Helmet>
            <div className="winningProductAdmin">
                <WinningProductsTop />
                <WinningProductTable/>
            </div>
        </main>
    )
}

export default WinningProducts
