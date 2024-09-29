import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import LatestAuctionCard from '../Cards/LatestAuctionCard/Index'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { getAllUserProducts } from '../../../redux/slices/producSlice';
import MyBidsCard from '../Cards/MyBidsCard/Index';
import { useTranslation } from 'react-i18next';

const MyBidRight = () => {
    const { oneBiddersProduct } = useSelector(state => state.products)
    const { userToken } = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken && userToken?.isLogin == true) {
            dispatch(getAllUserProducts(userToken.id))
        }

    }, [])
    const productsPerPage = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(oneBiddersProduct.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = oneBiddersProduct.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const productsPerPage2 = 4;

    const [currentPage2, setCurrentPage2] = useState(1);

    const filteredProducts = oneBiddersProduct.filter(product => product.createdAt);

    const sortedProducts = filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const totalPages2 = Math.ceil(sortedProducts.length / productsPerPage2);

    const startIndex2 = (currentPage2 - 1) * productsPerPage2;
    const endIndex2 = startIndex2 + productsPerPage2;

    const currentCards = sortedProducts.slice(startIndex2, endIndex2);
    const handlePageChange2 = (newPage) => {
        setCurrentPage2(newPage);
    };
    const filteredProducts2 = currentCards.filter(product => product.userId !== product.bidderId);
    const filteredProducts3 = currentProducts.filter(product => product.userId !== product.bidderId);


    const { t } = useTranslation()

    const btn1Ref = useRef()
    const btn2Ref = useRef()
    const cardBox1Ref = useRef()
    const cardBox2Ref = useRef()
    const hanldeActiveBtn2 = () => {
        btn1Ref.current.classList.remove('myBidActive2')
        btn2Ref.current.classList.add('myBidActive2')
        cardBox1Ref.current.classList.add('d-none')
        cardBox2Ref.current.classList.replace('d-none', 'd-block')
    }
    const hanldeActiveBtn1 = () => {
        btn2Ref.current.classList.remove('myBidActive2')
        btn1Ref.current.classList.add('myBidActive2')
        cardBox1Ref.current.classList.remove('d-none')
        cardBox2Ref.current.classList.replace('d-block', 'd-none')
    }
    return (
        <div className='myBidRight'>
            <div className="myBidRightBox">
                <div className="myBidRightBoxButtons">
                    <h5 className="myBidRightBoxTitle">
                        {
                            t('pages.myBids.title')
                        }
                    </h5>
                    <div className="myBidRightBoxBtns">
                        <button onClick={hanldeActiveBtn1} ref={btn1Ref} className="myBidBtn2 myBidActive2">
                            <span>
                                {
                                    t('pages.myBids.btn1')
                                }
                            </span>
                        </button>
                        <button onClick={hanldeActiveBtn2} ref={btn2Ref} className="myBidBtn2">
                            <span>
                                {
                                    t('pages.myBids.btn2')
                                }
                            </span>
                        </button>
                    </div>
                </div>
                <div ref={cardBox1Ref} className="myBidRightBoxCards1">
                    <div className='row g-4'>
                        {
                            filteredProducts3?.map((item, index) => {
                                return <div key={index} className='col-xl-6 myBidColCard2 col-lg-6 col-md-6 wow animate__animated animate__fadeInUp' data-wow-delay="0.2s">
                                    <MyBidsCard index={index} item={item} />
                                </div>
                            })
                        }

                    </div>

                    <div style={{ display: oneBiddersProduct.length > 4 ? '' : "none" }} className="productFilterSectionBottom">
                        <Pagination defaultCurrent={1}
                            total={oneBiddersProduct.length}
                            pageSize={productsPerPage}
                            current={currentPage}
                            onChange={handlePageChange} />
                    </div>

                </div>
                <div ref={cardBox2Ref} className="myBidRightBoxCards1 d-none">
                    <div className='row g-4'>
                        {
                            filteredProducts2?.map((item, index) => {
                                return <div key={index} className='col-xl-6 myBidColCard2 col-lg-6 col-md-6 wow animate__animated animate__fadeInUp' data-wow-delay="0.2s">
                                    <MyBidsCard index={index} item={item} />
                                </div>
                            })
                        }

                    </div>

                    <div style={{ display: oneBiddersProduct.length > 4 ? '' : "none" }} className="productFilterSectionBottom">
                        <Pagination defaultCurrent={1}
                            total={oneBiddersProduct.length}
                            pageSize={productsPerPage2}
                            current={currentPage2}
                            onChange={handlePageChange2} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBidRight
