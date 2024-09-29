import React, { useEffect, useState } from 'react'
import './Index.scss'
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { getAllUserWinningProduct, searchWinningProduct, sortProducts } from '../../../redux/slices/winningProductSlice';
import WinningBidsProductCard from '../Cards/WinningBidsProductCard/Index';
import { useTranslation } from 'react-i18next';
const WinningBidsRight = () => {
    const { userWinningProducts } = useSelector(state => state.winningProducts)
    const dispatch = useDispatch()
    const { userToken } = useSelector(state => state.users)
    useEffect(() => {
        if (userToken && userToken?.isLogin == true) {
            dispatch(getAllUserWinningProduct(userToken.id))
        }

    }, [])
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = userWinningProducts?.slice(startIndex, endIndex);

    const totalPages = Math.ceil((userWinningProducts?.length || 0) / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const { t } = useTranslation()
    return (
        <div className='winningBidsRight'>
            <div className="winningBidsRightInside">
                <div className="winningBidsRightInsideTop">
                    <h5 className="winningBidsRightTitle">
                        {
                            t('pages.winningBids.title')
                        }
                    </h5>
                    <div className="winningBidsRightFilter">
                        <div className="winningBidsRightFilterLeft">
                            <form action="#">
                                <input type="text" placeholder={t('pages.winningBids.searchInp')} onChange={(e) => {
                                    dispatch(searchWinningProduct(e.target.value))
                                }} />
                                <div className="searchIconWinBd">
                                    <IoSearch />
                                </div>
                            </form>
                        </div>
                        <div className="winningBidsRightFilterRight">
                            <div className="winBidFilter">
                                <p>
                                    {
                                        t('pages.winningBids.sorting.title')
                                    }
                                </p>
                                <select className='form-select' onChange={(e) => {
                                    dispatch(sortProducts(e.target.value))
                                }}>
                                    <option value="df">
                                        {
                                            t('pages.winningBids.sorting.selectOption.op1')
                                        }
                                    </option>
                                    <optgroup label={t('pages.winningBids.sorting.selectOption.label1')}>
                                        <option value="A-Z">A-Z</option>
                                        <option value="Z-A">Z-A</option>
                                    </optgroup>
                                    <optgroup label={t('pages.winningBids.sorting.selectOption.label2')}>
                                        <option value="0-9">0-9</option>
                                        <option value="9-0">9-0</option>
                                    </optgroup>
                                    <optgroup label={t('pages.winningBids.sorting.selectOption.label3')}>
                                        <option value="Electronic">
                                            {
                                                t('pages.winningBids.sorting.selectOption.op2')
                                            }
                                        </option>
                                        <option value="Jewelry">
                                            {
                                                t('pages.winningBids.sorting.selectOption.op3')
                                            }
                                        </option>
                                        <option value="Car">
                                            {
                                                t('pages.winningBids.sorting.selectOption.op4')
                                            }
                                        </option>
                                    </optgroup>
                                    <optgroup label={t('pages.winningBids.sorting.selectOption.label4')}>
                                        <option value="Latest">
                                            {
                                                t('pages.winningBids.sorting.selectOption.op5')
                                            }
                                        </option>
                                        <option value="Oldest">
                                            {
                                                t('pages.winningBids.sorting.selectOption.op6')
                                            }
                                        </option>
                                    </optgroup>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row g-4'>
                    {
                        currentItems?.map((prod, index) => {
                            return <div key={index} data-wow-delay="0.2s" className='col-xl-6 winningBidsColBox mb-4 col-lg-6 col-md-6 wow animate__fadeInUp animate__animated'>
                                {
                                    prod.product.map((item, index) => {
                                        return <WinningBidsProductCard prod={prod} item={item} key={index} />
                                    })
                                }

                            </div>
                        })
                    }

                </div>
                <div style={{ display: userWinningProducts?.length > 4 ? '' : "none" }} className="productFilterSectionBottom">
                    <Pagination defaultCurrent={1}
                        total={userWinningProducts?.length || 0}
                        pageSize={itemsPerPage}
                        current={currentPage}
                        onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default WinningBidsRight 
