import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import LatestAuctionCard from '../Cards/LatestAuctionCard/Index'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { getAllUserProducts } from '../../../redux/slices/producSlice';
import { useTranslation } from 'react-i18next';

const MyBidsRight = () => {
    const { oneUserAllProducts } = useSelector(state => state.products)
    const { userToken } = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken && userToken?.isLogin == true) {
            dispatch(getAllUserProducts(userToken.id))
        }

    }, [])
    const productsPerPage = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(oneUserAllProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = oneUserAllProducts.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const productsPerPage2 = 4;

    const [currentPage2, setCurrentPage2] = useState(1);

    const filteredProducts = oneUserAllProducts.filter(product => product.createdAt);

    const sortedProducts = filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const totalPages2 = Math.ceil(sortedProducts.length / productsPerPage2);

    const startIndex2 = (currentPage2 - 1) * productsPerPage2;
    const endIndex2 = startIndex2 + productsPerPage2;

    const currentCards = sortedProducts.slice(startIndex2, endIndex2);
    const handlePageChange2 = (newPage) => {
        setCurrentPage2(newPage);
    };



    const btn1Ref = useRef()
    const btn2Ref = useRef()
    const cardBox1Ref = useRef()
    const cardBox2Ref = useRef()
    const hanldeActiveBtn2 = () => {
        btn1Ref.current.classList.remove('myBidActive')
        btn2Ref.current.classList.add('myBidActive')
        cardBox1Ref.current.classList.add('d-none')
        cardBox2Ref.current.classList.replace('d-none', 'd-block')
    }
    const hanldeActiveBtn1 = () => {
        btn2Ref.current.classList.remove('myBidActive')
        btn1Ref.current.classList.add('myBidActive')
        cardBox1Ref.current.classList.remove('d-none')
        cardBox2Ref.current.classList.replace('d-block', 'd-none')
    }

    const { t } = useTranslation()
    return (
        <div className='myBidsRight'>
            <div className="myBidsRightBox">
                <div className="myBidsRightBoxButtons">
                    <h5 className="myBidsRightBoxTitle">
                        {
                            t('pages.myProducts.title')
                        }
                    </h5>
                    <div className="myBidsRightBoxBtns">
                        <button onClick={hanldeActiveBtn1} ref={btn1Ref} className="myBidBtn myBidActive">
                            <span>  {
                                t('pages.myProducts.btn1')
                            }</span>
                        </button>
                        <button onClick={hanldeActiveBtn2} ref={btn2Ref} className="myBidBtn">
                            <span>  {
                                t('pages.myProducts.btn2')
                            }</span>
                        </button>
                    </div>
                </div>
                <div ref={cardBox1Ref} className="myBidsRightBoxCards1">
                    <div className='row g-4'>
                        {
                            currentProducts?.map((item, index) => {
                                return <div key={index} className='col-xl-6 myBidColCard col-lg-6 col-md-6 wow animate__animated animate__fadeInUp' data-wow-delay="0.2s">
                                    <LatestAuctionCard index={index} item={item} />
                                </div>
                            })
                        }

                    </div>

                    <div style={{ display: oneUserAllProducts.length > 4 ? '' : "none" }} className="productFilterSectionBottom">
                        <Pagination defaultCurrent={1}
                            total={oneUserAllProducts.length}
                            pageSize={productsPerPage}
                            current={currentPage}
                            onChange={handlePageChange} />
                    </div>

                </div>
                <div ref={cardBox2Ref} className="myBidsRightBoxCards1 d-none">
                    <div className='row g-4'>
                        {
                            currentCards?.map((item, index) => {
                                return <div key={index} className='col-xl-6 myBidColCard col-lg-6 col-md-6 wow animate__animated animate__fadeInUp' data-wow-delay="0.2s">
                                    <LatestAuctionCard index={index} item={item} />
                                </div>
                            })
                        }

                    </div>

                    <div style={{ display: oneUserAllProducts.length > 4 ? '' : "none" }} className="productFilterSectionBottom">
                        <Pagination defaultCurrent={1}
                            total={oneUserAllProducts.length}
                            pageSize={productsPerPage2}
                            current={currentPage2}
                            onChange={handlePageChange2} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBidsRight
