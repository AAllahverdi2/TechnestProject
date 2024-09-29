import React, { useRef } from 'react'
import './Index.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import icon from '../../../assets/favicon.png'
import Icon from '@mdi/react';
import { mdiCog, mdiFormatLineSpacing, mdiLogout, mdiMenu, mdiMenuDown } from '@mdi/js';
import exampleImage from '../../../assets/exampleImage.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useDataContext } from '../../../context/context';
import { searchTestimonial } from '../../../redux/slices/testimonialSlice';
import { searchQuestions } from '../../../redux/slices/questionsSlice';
import { searchWinner } from '../../../redux/slices/winnersSlice';
import { searchManagement } from '../../../redux/slices/managementSlice';
import { editUser, getOneUser, logOut, searchUser } from '../../../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { searchProducts2 } from '../../../redux/slices/producSlice';
import { searchBidders } from '../../../redux/slices/bidHistorySlice';
import { searchWinningProduct2 } from '../../../redux/slices/winningProductSlice';
import { searchSubscribers } from '../../../redux/slices/subscribersSlice';
import { searchOrder } from '../../../redux/slices/orderSlice';
import { searchBlog } from '../../../redux/slices/blogSlice';
import { searchComment } from '../../../redux/slices/commentSlice';
import { searchTodo } from '../../../redux/slices/todoSlice';
const AdminHeader = () => {
  const { adminHeadRef, handleAddWidthHeader, handleResSideBar } = useDataContext()
  const userAdminDrop = useRef()
  const handleActiveDrop = () => {
    userAdminDrop.current.classList.toggle('activeUserAdminDrop')
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { userToken } = useSelector(state => state.users)
  return (
    <header className='adminHeader' style={{ display: location.pathname == '/admin/loginAdmin' || location.pathname == '/admin/adminRegister' ? 'none' : '' }} ref={adminHeadRef}>
      <div className="adminHeaderTop d-lg-none d-flex align-items-center justify-content-center">
        <Link to="/admin" className="adminHeaderTopLogo">
          <img src={icon} alt="icon" />
        </Link>
      </div>
      <div className="adminHeaderBottom">
        <button className='adminHeadBtn1' onClick={handleAddWidthHeader}>
          <Icon path={mdiMenu} size={0.8} />

        </button>
        <ul className="headerSearchBx">
          <li>
            <div className="headerSearchInputBox  mt-2 mt-md-0 d-none d-lg-flex ">
              <input disabled={location.pathname !== '/admin/testimonialsTable' &&
                location.pathname !== '/admin/questionsTable' &&
                location.pathname !== '/admin/winnersTable' &&
                location.pathname !== '/admin/users' &&
                location.pathname !== '/admin/managementTable' &&
                location.pathname !== '/admin/products' &&
                location.pathname !== '/admin/bidHistory' &&
                location.pathname !== '/admin/winningProducts' &&
                location.pathname !== '/admin/subscribers' &&
                location.pathname !== '/admin/adminOrders' &&
                location.pathname !== '/admin/blogs' &&
                location.pathname !== '/admin/comments' &&
                location.pathname !== '/admin'
              } type="text" placeholder='Search products' onChange={(e) => {
                if (location.pathname == '/admin/testimonialsTable') {
                  dispatch(searchTestimonial(e.target.value))
                } else if (location.pathname == '/admin/questionsTable') {
                  dispatch(searchQuestions(e.target.value))
                } else if (location.pathname == '/admin/winnersTable') {
                  dispatch(searchWinner(e.target.value))
                } else if (location.pathname == '/admin/managementTable') {
                  dispatch(searchManagement(e.target.value))
                } else if (location.pathname == '/admin/users') {
                  dispatch(searchUser(e.target.value))

                } else if (location.pathname == '/admin/products') {
                  dispatch(searchProducts2(e.target.value))

                } else if (location.pathname == '/admin/bidHistory') {
                  dispatch(searchBidders(e.target.value))

                } else if (location.pathname == '/admin/winningProducts') {
                  dispatch(searchWinningProduct2(e.target.value))

                } else if (location.pathname == '/admin/subscribers') {
                  dispatch(searchSubscribers(e.target.value))

                } else if (location.pathname == '/admin/adminOrders') {
                  dispatch(searchOrder(e.target.value))

                } else if (location.pathname == '/admin/blogs') {
                  dispatch(searchBlog(e.target.value))

                } else if (location.pathname == '/admin/comments') {
                  dispatch(searchComment(e.target.value))
                } else if (location.pathname == '/admin') {
                  dispatch(searchTodo(e.target.value))
                }
              }} />
            </div>
          </li>
        </ul>
        <ul className="adminUserDrop">
          <li className="userLeftDrop">
            <button className='userLeftDropBtn' onClick={handleActiveDrop}>
              <div className="userLeftDropButtonInside">
                <img src={`${userToken?.isAdmin == true ? `http://localhost:5050/public/${userToken?.profileImage}` : 'https://cdn.vectorstock.com/i/preview-1x/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
                  }`} alt="exImage" />
                <p className='mb-0 d-none d-sm-block '>
                  {userToken?.isAdmin == true ? userToken?.firstName : 'Admin'} {userToken?.isAdmin == true ? userToken?.lastName : ''}
                </p>
                <span className='d-none d-sm-block'>
                  <Icon path={mdiMenuDown} size={0.7} />
                </span>
              </div>

            </button>
            <div className="userLeftDropInside" ref={userAdminDrop}>
              <h6 className="p-3 mb-0">Profile</h6>
              <div className="userLeftDropInsideLine"></div>
              <Link
                onClick={async () => {
                  handleActiveDrop()
                  await dispatch(getOneUser(userToken?.id))
                }} to={`/admin/accountSettings/${userToken?.id}`}
                className='userLeftDropInsideClick'>
                <div className="userLeftDropInsideIcon">
                  <div className="userLeftDropInsideI setIconProf">
                    <Icon path={mdiCog} size={0.8} />

                  </div>
                </div>
                <div className="userLeftDropInsideText">
                  <p className=" m-0">Settings</p>
                </div>
              </Link>
              <div className="userLeftDropInsideLine"></div>
              <button onClick={async () => {
                await dispatch(editUser({ id: userToken?.id, newData: { ...userToken, status: false, isLogin: false } }))
                dispatch(logOut())
                toast.success('Logout successful! See you next time.');

                navigate('/')
              }} className='userLeftDropInsideClick'>
                <div className="userLeftDropInsideIcon">
                  <div className="userLeftDropInsideI setLogOutI">
                    <Icon path={mdiLogout} size={0.8} />

                  </div>
                </div>
                <div className="userLeftDropInsideText">
                  <p className=" m-0">Log Out</p>
                </div>
              </button>
            </div>
          </li>
        </ul>
        <button className="sideBarToggleMenu d-lg-none align-self-center" onClick={handleResSideBar}>
          <Icon path={mdiFormatLineSpacing} size={0.9} />

        </button>
      </div>
    </header>
  )
}

export default AdminHeader
