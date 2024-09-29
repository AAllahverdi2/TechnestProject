import React, { useState } from 'react'
import './Index.scss'
import { IoSearch } from "react-icons/io5";
import LatestAuctionCard from '../Cards/LatestAuctionCard/Index';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { searchWishlist, sortWishlist } from '../../../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
const FavoritesRight = () => {
    const { userToken, oneUser } = useSelector(state => state.users)
    const dispatch = useDispatch()

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = userToken?.wishlist?.slice(startIndex, endIndex);

    const totalPages = Math.ceil((userToken?.wishlist?.length || 0) / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const { t } = useTranslation()
    return (
        <div className='myFavRightBoxes'>
            <div className="myFavoritesRightInside">
                <div className="myFavoritesRightInsideTop">
                    <h5 className="myFavoritesTitle">
                        {
                            t('pages.myFavorites.title')
                        }

                    </h5>
                    <div className="myFavoritesRightFilter">
                        <div className="myFavoritesRightFilterLeft">
                            <form action="#">
                                <input type="text" placeholder={t('pages.myFavorites.searchInp')} onChange={(e) => {
                                    dispatch(searchWishlist(e.target.value))
                                }} />
                                <div className="searchIconWinBd">
                                    <IoSearch />
                                </div>
                            </form>
                        </div>
                        <div className="myFavoritesRightFilterRight">
                            <div className="myFavFilter">
                                <p>
                                    Short By:
                                </p>
                                <select className='form-select' onChange={(e) => {
                                    dispatch(sortWishlist(e.target.value))
                                }}>
                                    <option value="df">
                                        {
                                            t('pages.myFavorites.sorting.selectOption.op1')
                                        }
                                    </option>
                                    <optgroup label={t('pages.myFavorites.sorting.selectOption.label1')}>
                                        <option value="A-Z">A-Z</option>
                                        <option value="Z-A">Z-A</option>
                                    </optgroup>
                                    <optgroup label={t('pages.myFavorites.sorting.selectOption.label2')}>
                                        <option value="0-9">0-9</option>
                                        <option value="9-0">9-0</option>
                                    </optgroup>
                                    <optgroup label={t('pages.myFavorites.sorting.selectOption.label3')}>
                                        <option value="Electronic">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op2')
                                            }
                                        </option>
                                        <option value="Jewelry">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op3')
                                            }
                                        </option>
                                        <option value="Car">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op4')
                                            }
                                        </option>
                                    </optgroup>
                                    <optgroup label={t('pages.myFavorites.sorting.selectOption.label4')}>
                                        <option value="Latest">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op5')
                                            }
                                        </option>
                                        <option value="Oldest">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op6')
                                            }
                                        </option>
                                    </optgroup>
                                    <optgroup label={t('pages.myFavorites.sorting.selectOption.label5')}>
                                        <option value="EndingSoon">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op7')
                                            }
                                        </option>
                                        <option value="EndingLater">
                                            {
                                                t('pages.myFavorites.sorting.selectOption.op8')
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
                        currentItems?.map((item, index) => {
                            return <div key={index} className='col-xl-6 myFavBidsCol col-lg-6 col-md-6 wow animate__fadeInUp animate__animated'>
                                <LatestAuctionCard item={item} key={index} />
                            </div>
                        })
                    }


                </div>
                <div style={{ display: userToken?.wishlist?.length > 4 ? '' : "none" }} className="productFilterSectionBottom">
                    <Pagination defaultCurrent={1}
                        total={userToken?.wishlist?.length || 0}
                        pageSize={itemsPerPage}
                        current={currentPage}
                        onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default FavoritesRight
