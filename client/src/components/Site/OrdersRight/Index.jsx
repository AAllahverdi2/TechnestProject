import React, { useEffect, useState } from 'react'
import './Index.scss'
import { IoSearch } from "react-icons/io5";
import LatestAuctionCard from '../Cards/LatestAuctionCard/Index';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { getAllUsersOrders, getOneOrder, searchOrder2, sortOrder2 } from '../../../redux/slices/orderSlice';
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiInformation } from '@mdi/js';
import moment from 'moment';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import { useDataContext } from '../../../context/context';
import { useTranslation } from 'react-i18next';
const OrdersRight = () => {
    const { userToken, oneUser } = useSelector(state => state.users)
    const { oneUserOrders } = useSelector(state => state.orders)
    const { handleOpenOrderDetail } = useDataContext()
    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken && userToken?.isLogin == true) {
            dispatch(getAllUsersOrders(userToken.id))
        }

    }, [])
    const itemsPerPage = 11;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = oneUserOrders?.slice(startIndex, endIndex);

    const totalPages = Math.ceil((oneUserOrders?.length || 0) / itemsPerPage);

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
                            t('pages.myOrders.title')
                        }
                    </h5>
                    <div className="myFavoritesRightFilter">
                        <div className="myFavoritesRightFilterLeft">
                            <form action="#">
                                <input type="text" placeholder={t('pages.myOrders.searchInp')} onChange={(e) => {
                                    dispatch(searchOrder2(e.target.value))
                                }} />
                                <div className="searchIconWinBd">
                                    <IoSearch />
                                </div>
                            </form>
                        </div>
                        <div className="myFavoritesRightFilterRight">
                            <div className="myFavFilter">
                                <p>
                                    {t('pages.myOrders.sorting.title')}
                                </p>
                                <select className='form-select' onChange={(e) => {

                                    dispatch(sortOrder2(e.target.value))
                                }}>
                                    <option value="df">
                                        {t('pages.myOrders.sorting.selectOption.op1')}
                                    </option>
                                    <optgroup label={t('pages.myOrders.sorting.selectOption.label1')}>
                                        <option value="A-Z">A-Z</option>
                                        <option value="Z-A">Z-A</option>
                                    </optgroup>
                                    <optgroup label={t('pages.myOrders.sorting.selectOption.label2')}>
                                        <option value="0-9">0-9</option>
                                        <option value="9-0">9-0</option>
                                    </optgroup>
                                    <optgroup label={t('pages.myOrders.sorting.selectOption.label3')}>
                                        <option value="Pending">
                                            {t('pages.myOrders.sorting.selectOption.op2')}

                                        </option>
                                        <option value="Accept">
                                            {t('pages.myOrders.sorting.selectOption.op3')}

                                        </option>
                                        <option value="Reject">
                                            {t('pages.myOrders.sorting.selectOption.op4')}

                                        </option>
                                    </optgroup>

                                </select>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboardRightBottom animate__animated wow animate__fadeInRight" data-wow-delay="0.3s">
                    <table>
                        <thead>
                            <tr className="borderNone">
                                <th>
                                    {
                                        t('pages.myOrders.table.th1')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.myOrders.table.th2')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.myOrders.table.th3')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.myOrders.table.th4')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.myOrders.table.th5')
                                    }
                                </th>
                                <th>
                                    {
                                        t('pages.myOrders.table.th6')
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems?.map((item, index) => {
                                    return <tr key={index} className="tb1">
                                        <td className="tdFirst">
                                            {item.orderFirstName}  {item.orderLastName}
                                        </td>
                                        <td>
                                            {item.orderGmail}
                                        </td>

                                        <td>
                                            ${item.orderTotalPrice}
                                        </td>
                                        <td>
                                            {item.orderTotalAmount}
                                        </td>
                                        <td>
                                            {item.orderStatus}
                                        </td>
                                        <td>
                                            <button onClick={async () => {
                                                await dispatch(getOneOrder(item._id))
                                                handleOpenOrderDetail()
                                            }} >
                                                <Icon path={mdiInformation} size={1} />

                                            </button>
                                        </td>
                                    </tr>
                                })
                            }


                        </tbody>
                    </table>
                </div>
                <div style={{ display: oneUserOrders?.length > 11 ? '' : "none" }} className="productFilterSectionBottom">
                    <Pagination defaultCurrent={1}
                        total={oneUserOrders?.length || 0}
                        pageSize={itemsPerPage}
                        current={currentPage}
                        onChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default OrdersRight
