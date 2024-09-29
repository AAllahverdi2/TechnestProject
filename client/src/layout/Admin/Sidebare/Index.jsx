import React, { useRef } from 'react'
import './Index.scss'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../../assets/LOGO.png'
import icon from '../../../assets/favicon.png'
import exampleImage from '../../../assets/exampleImage.jpg'
import { mdiAccountBadge, mdiAccountGroup, mdiAccountTie, mdiAccountTieWoman, mdiCalendarToday, mdiChatQuestion, mdiComment, mdiDatabaseCog, mdiDotsVertical, mdiFileStar, mdiGoogleStreetView, mdiHelpRhombusOutline, mdiHomeAccount, mdiInvoiceList, mdiMessageDraw, mdiPodium, mdiPodiumGold, mdiPost, mdiSpeedometer, mdiStore } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import { mdiInformationOutline } from '@mdi/js';
import { useDataContext } from '../../../context/context'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUser } from '../../../redux/slices/userSlice'

const Sidebare = () => {
    const { sideBardHeadRef } = useDataContext()
    const profDropRef = useRef()
    const { userToken } = useSelector(state => state.users)

    const handleActiveDrop = () => {
        profDropRef.current.classList.toggle('activeProfDrop')
    }
    const location = useLocation()
    const dispatch = useDispatch()
    return (
        <div className="sidebar " style={{ display: location.pathname == '/admin/loginAdmin' || location.pathname == '/admin/adminRegister' ? 'none' : '' }} ref={sideBardHeadRef}>
            <div className="sidebarTop  d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <Link to={'/admin'} className='sidebarTopLink1'>
                    <img src={logo} alt="logo" />
                </Link>
                <Link to={'/admin'} className='sidebarTopLink2'>
                    <img src={icon} alt="icon" />
                </Link>
            </div>
            <ul className="sidebarBottom">
                <li className='profileImage sidebarBottomLinks'>
                    <div className="profileImageInside">
                        <div className="profileImageInsideLeft">
                            <div className="profileImageInsideLeftImg">
                                <img src={`${userToken?.isAdmin == true ? `http://localhost:5050/public/${userToken?.profileImage}` : 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
                                    }`} alt="exImage" />
                                <span style={{ background: userToken?.status != true ? 'red' : '' }} className={`${userToken?.isAdmin == true && userToken?.status == true ? 'activeGreen' : ''
                                    }`}>

                                </span>
                            </div>
                            <div className="profileImageInsideLeftAbout">
                                <h5>{userToken?.isAdmin == true ? userToken?.firstName : 'Admin'} {userToken?.isAdmin == true ? userToken?.lastName : ''}</h5>
                                <span>Gold Member</span>
                            </div>
                        </div>
                        <div className="profileImageInsideRight" onClick={handleActiveDrop}>
                            <Icon path={mdiDotsVertical} size={1} />

                        </div>
                        <div ref={profDropRef} className="profilDropMenu">
                            <Link onClick={async () => {
                                handleActiveDrop()
                                await dispatch(getOneUser(userToken?.id))
                            }} to={`/admin/accountSettings/${userToken?.id}`} className="profilDropMenuItem">
                                <div className="profilDropMenuItemImage">
                                    <div className="profDropImgBox">
                                        <span className='setIcon'>
                                            <Icon path={mdiCog} size={0.8} />
                                        </span>
                                    </div>
                                </div>
                                <div className="profilDropMenuItemText">
                                    <p>
                                        Account settings
                                    </p>
                                </div>
                            </Link>
                            <div className="profilDropMenuLine"></div>
                            <Link to={'/admin/changeAdminPass'} onClick={() => {
                                handleActiveDrop()
                            }} className="profilDropMenuItem">
                                <div className="profilDropMenuItemImage">
                                    <div className="profDropImgBox">
                                        <span className='infoIcon'>
                                            <Icon path={mdiInformationOutline} size={0.8} />
                                        </span>
                                    </div>
                                </div>
                                <div className="profilDropMenuItemText">
                                    <p>
                                        Change Password
                                    </p>
                                </div>
                            </Link>
                            <div className="profilDropMenuLine"></div>
                            <div className="profilDropMenuItem">
                                <div className="profilDropMenuItemImage">
                                    <div className="profDropImgBox">
                                        <span className='todoİcon'>
                                            <Icon path={mdiCalendarToday} size={0.8} />

                                        </span>
                                    </div>
                                </div>
                                <div className="profilDropMenuItemText">
                                    <p>
                                        To-do list
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="sidebarBottomLinks navCategory">
                    <span>Navigation</span>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/' ? "navMenuActive" : ""}`} >
                    <Link to={'/'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiHomeAccount} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Site
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin'}>
                        <div className="navMenuIcon speedometer">
                            <span>

                                <Icon path={mdiSpeedometer} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Dashboard
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/users' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/users'}>
                        <div className="navMenuIcon text-light">
                            <span>
                                <Icon path={mdiAccountGroup} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Users
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/products' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/products'}>
                        <div className="navMenuIcon text-warning">
                            <span>
                                <Icon path={mdiDatabaseCog} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Products
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/bidHistory' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/bidHistory'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiAccountTie} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Bidders
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/blogs' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/blogs'}>
                        <div className="navMenuIcon text-danger">
                            <span>
                                <Icon path={mdiPost} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Blogs
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/comments' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/comments'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiComment} size={0.8} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Comments
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/winningProducts' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/winningProducts'}>
                        <div className="navMenuIcon text-secondary">
                            <span>
                                <Icon path={mdiInvoiceList} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Winner Products
                        </span>
                    </Link>
                </li>


                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/adminOrders' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/adminOrders'}>
                        <div className="navMenuIcon speedometer">
                            <span>
                                <Icon path={mdiStore} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Orders
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/testimonialsTable' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/testimonialsTable'}>
                        <div className="navMenuIcon text-primary">
                            <span>
                                <Icon path={mdiMessageDraw} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Testimonials
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/subscribers' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/subscribers'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiAccountBadge} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Subscribers
                        </span>
                    </Link>
                </li>


                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/questionsTable' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/questionsTable'}>
                        <div className="navMenuIcon text-danger">
                            <span>
                                <Icon path={mdiHelpRhombusOutline} size={1} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Question
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/winnersTable' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/winnersTable'}>
                        <div className="navMenuIcon text-primary">
                            <span>
                                <Icon path={mdiPodium} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Winners
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/managementTable' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/managementTable'}>
                        <div className="navMenuIcon ">
                            <span style={{ color: '#F7A278' }}>
                                <Icon path={mdiAccountTieWoman} size={0.8} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Management
                        </span>
                    </Link>
                </li>
                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addTestimonial' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addTestimonial'}>
                        <div className="navMenuIcon text-warning">
                            <span>
                                <Icon path={mdiFileStar} size={1} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Testimonial
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addQuestions' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addQuestions'}>
                        <div className="navMenuIcon text-info">
                            <span>
                                <Icon path={mdiChatQuestion} size={1} />
                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Question
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addWinners' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addWinners'}>
                        <div className="navMenuIcon ">
                            <span style={{ color: '#8f5fe8' }}>
                                <Icon path={mdiPodiumGold} size={0.9} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Winners
                        </span>
                    </Link>
                </li>

                <li className={`sidebarBottomLinks navMenu ${location.pathname === '/admin/addManagement' ? "navMenuActive" : ""}`} >
                    <Link to={'/admin/addManagement'}>
                        <div className="navMenuIcon ">
                            <span style={{ color: '#B22222' }}>
                                <Icon path={mdiGoogleStreetView} size={0.9} />

                            </span>
                        </div>
                        <span className="navMenuText">
                            Add Management
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebare
