import React, { useEffect } from 'react'
import './Index.scss'
import dashboardIcon from '../../../assets/dashboardIcon.png'
import dashboardIcon2 from '../../../assets/dashboardIcon2.png'
import dashboardIcon1 from '../../../assets/dashboardIcon1.png'
import dashboardIcon3 from '../../../assets/dashboardIcon3.png'
import dashboardIcon4 from '../../../assets/dashboardIcon4.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useDataContext } from '../../../context/context'
import { deleteUser, editUser, getOneUser, logOut } from '../../../redux/slices/userSlice'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { getAllBiddersProducts, getAllUserProducts } from '../../../redux/slices/producSlice'
import { getAllUserWinningProduct } from '../../../redux/slices/winningProductSlice'
import { getAllUsersOrders } from '../../../redux/slices/orderSlice'
import { useTranslation } from 'react-i18next'
const DashboardLeft = () => {
    const { userToken, userLoading } = useSelector(state => state.users)
    const navigate = useNavigate()
    const { handleOpenImageUpdate, handleOpenBlog } = useDataContext()
    const dispatch = useDispatch()
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const location = useLocation()
    const { t } = useTranslation()
    return (
        <div className='dashboardLeft'>

            <div className="dashboardLeftTop">
                <div className="dashboardLeftTopTop" style={{ cursor: 'pointer' }} onClick={() => {
                    dispatch(getOneUser(userToken?.id))
                    handleOpenImageUpdate()
                }}>
                    <img src={`http://localhost:5050/public/${userToken?.profileImage}`} alt="userImage" />
                </div>

                <div className="dashboardLeftTopBottom">
                    <h5>{userToken?.firstName} {userToken?.lastName}</h5>
                    <span>{userToken?.userGmail}</span>
                    <button onClick={async () => {
                        await dispatch(editUser({ id: userToken?.id, newData: { status: false, isLogin: false } }))
                        dispatch(logOut())
                        toast.success(t('pages.dashboard.dashboardLeft.logoutMessage'));

                        navigate('/')
                    }}>
                        {
                            t('pages.dashboard.dashboardLeft.btn1')
                        }
                    </button>
                    <button onClick={handleOpenBlog}>
                        {
                            t('pages.dashboard.dashboardLeft.btn2')
                        }
                    </button>
                    <button onClick={async () => {

                        try {
                            const result = await Swal.fire({
                                title: t('pages.dashboard.dashboardLeft.accountDelete.messageTitle'),
                                text: t('pages.dashboard.dashboardLeft.accountDelete.messageText'),
                                icon: "warning",
                                showCancelButton: true,
                                cancelButtonText: t('pages.dashboard.dashboardLeft.accountDelete.cancelBtn'),
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: t('pages.dashboard.dashboardLeft.accountDelete.confirmBtn')
                            });

                            if (result.isConfirmed) {
                                await dispatch(deleteUser(userToken?.id));
                                Swal.fire({
                                    title: t('pages.dashboard.dashboardLeft.accountDelete.confirm.title'),
                                    text: t('pages.dashboard.dashboardLeft.accountDelete.confirm.text'),
                                    icon: "success"
                                });

                                navigate('/');
                            }
                        } catch (error) {
                            console.error("Error deleting account:", error);
                        }



                    }}>
                        {
                            t('pages.dashboard.dashboardLeft.accountDelete.btn')
                        }
                    </button>
                </div>
            </div>
            <ul className="dashboardLeftBottom">
                <li style={{ background: location.pathname == '/dashboard' ? "#4934d3 " : "", borderRadius: location.pathname == "/dashboard" ? "10px" : "" }}>
                    <Link onClick={async () => {
                        await dispatch(getAllUserProducts(userToken?.id))
                        await dispatch(getAllBiddersProducts(userToken?.id))

                        handleScrollToTop()

                    }
                    } to={'/dashboard'}>
                        <img src={dashboardIcon} alt="dashboardIcon" />
                        <span>
                            {
                                t('pages.dashboard.dashboardLeft.list.li1')
                            }
                        </span>
                    </Link>
                </li>
                <li style={{ background: location.pathname == '/personalProfile' ? "#4934d3 " : "", borderRadius: location.pathname == "/personalProfile" ? "10px" : "" }}>
                    <Link onClick={handleScrollToTop} to={'/personalProfile'}>
                        <img src={dashboardIcon1} alt="dashboardIcon" />
                        <span>
                            {
                                t('pages.dashboard.dashboardLeft.list.li2')
                            } </span>
                    </Link>
                </li>
                <li style={{ background: location.pathname == '/myProducts' ? "#4934d3 " : "", borderRadius: location.pathname == "/myProducts" ? "10px" : "" }}>
                    <Link onClick={async () => {
                        await dispatch(getAllUserProducts(userToken?.id))

                        handleScrollToTop()

                    }
                    } to={'/myProducts'}>
                        <img src={dashboardIcon2} alt="dashboardIcon" />
                        <span>
                            {
                                t('pages.dashboard.dashboardLeft.list.li3')
                            }
                        </span>
                    </Link>
                </li>
                <li style={{ background: location.pathname == '/myBid' ? "#4934d3 " : "", borderRadius: location.pathname == "/myBid" ? "10px" : "" }}>
                    <Link onClick={async () => {
                        await dispatch(getAllBiddersProducts(userToken?.id))

                        handleScrollToTop()
                    }
                    } to={'/myBid'}>
                        <img src={dashboardIcon2} alt="dashboardIcon" />
                        <span>
                            {
                                t('pages.dashboard.dashboardLeft.list.li4')
                            }
                        </span>
                    </Link>
                </li>

                <li style={{ background: location.pathname == '/winningBids' ? "#4934d3 " : "", borderRadius: location.pathname == "/winningBids" ? "10px" : "" }}>
                    <Link onClick={async () => {
                        await dispatch(getAllUserWinningProduct(userToken?.id))

                        handleScrollToTop()

                    }

                    } to={'/winningBids'}>
                        <img src={dashboardIcon3} alt="dashboardIcon" />
                        <span>

                            {
                                t('pages.dashboard.dashboardLeft.list.li5')
                            }
                        </span>
                    </Link>
                </li>
                <li style={{ background: location.pathname == '/myFavorites' ? "#4934d3 " : "", borderRadius: location.pathname == "/myFavorites" ? "10px" : "" }}>
                    <Link onClick={handleScrollToTop} to={'/myFavorites'}>
                        <img src={dashboardIcon4} alt="dashboardIcon" />
                        <span>
                            {
                                t('pages.dashboard.dashboardLeft.list.li6')
                            }
                        </span>
                    </Link>
                </li>

                <li style={{ background: location.pathname == '/myOrders' ? "#4934d3 " : "", borderRadius: location.pathname == "/myOrders" ? "10px" : "" }}>
                    <Link onClick={async () => {
                        await dispatch(getAllUsersOrders(userToken?.id))
                        handleScrollToTop()
                    }} to={'/myOrders'}>
                        <img src={dashboardIcon4} alt="dashboardIcon" />
                        <span>
                            {
                                t('pages.dashboard.dashboardLeft.list.li7')
                            }
                        </span>
                    </Link>
                </li>
            </ul>
        </div >
    )
}

export default DashboardLeft
