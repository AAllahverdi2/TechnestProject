import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { FaMessage } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import logo from '../../../assets/LOGO.png'
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Fade as Hamburger } from 'hamburger-react'
import LoginModal from '../../../components/Site/LoginModal/Index';
import { useDataContext } from '../../../context/context';
import RegisterForm from '../../../components/Site/RegisterForm/Index';
import UserImageModal from '../../../components/Site/Modals/UserImageModal/Index'
import PersonaleUpdateModel from '../../../components/Site/Modals/PersonaleUpdateModel/Index'
import AccountSettingsModel from '../../../components/Site/Modals/AccountSettingsModel/Index'
import EmailUpdateModel from '../../../components/Site/Modals/EmailUpdateModel/Index'
import PhoneUpdateModal from '../../../components/Site/Modals/PhoneUpdateModal/Index'
import PasswordUpdateModel from '../../../components/Site/Modals/PasswordUpdateModel/Index'
import { useDispatch, useSelector } from 'react-redux';
import { editUser, logOut } from '../../../redux/slices/userSlice';
import ForgotPassword from '../../../components/Site/Modals/ForgotPassword/Index';
import UpdateForgotPassword from '../../../components/Site/Modals/UpdateForgotPassword/Index';
import AddProductModal from '../../../components/Site/Modals/AddProductModal/Index';
import toast from 'react-hot-toast';
import ProductUpdateModal from '../../../components/Site/Modals/ProductUpdateModal/Index';
import { getAllBiddersProducts, getAllUserProducts, getOneProducts, searchProducts3, updateProdIncreament } from '../../../redux/slices/producSlice';
import { getAllUserWinningProduct } from '../../../redux/slices/winningProductSlice';
import UpcomingCard from '../../../components/Site/Cards/UpcomingCard/Index';
import Countdown from 'react-countdown';
import bidNm from '../../../assets/bidNm.png'
import CheckoutModal from '../../../components/Site/Modals/CheckoutModal/Index';
import { getAllUsersOrders } from '../../../redux/slices/orderSlice';
import AcceptModal from '../../../components/Site/Modals/AcceptModal/Index';
import AddBlogModal from '../../../components/Site/Modals/AddBlogModal/Index';
import UpdateBlogModal from '../../../components/Site/Modals/UpdateBlogModal/Index';
import OrderDetailModal from '../../../components/Site/Modals/OrderDetailModal/Index';

const Header = () => {
  const dispatch = useDispatch()
  const { userToken } = useSelector(state => state.users)
  const navigate = useNavigate()
  const searchRef = useRef()
  const searchRef2 = useRef()
  const { searchedProd } = useSelector(state => state.products)
  const handleOpenSearch = () => {
    searchRef.current.classList.add('openSearch')
  }
  const handleOpenSearchBtn = () => {
    searchRef2.current.classList.add('openSearch2')


  }
  const handleCloseSearchBtn = () => {
    searchRef2.current.classList.remove('openSearch2')

  }
  const handleCloseSearch = () => {
    searchRef.current.classList.remove('openSearch')
  }
  const scrollRef = useRef()
  const dashboardRef = useRef()
  const handleOpenDashboard = () => {
    dashboardRef.current.classList.toggle('activeDashboard')
  }
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 250) {
      scrollRef.current.classList.add("fixedMenu")
      scrollRef.current.classList.add("animate__fadeInDown")
    }
    else {
      scrollRef.current.classList.remove("fixedMenu")

      scrollRef.current.classList.remove("animate__fadeInDown")
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const location = useLocation()
  const resDropMen = useRef()
  const handleOpenResPages = () => {
    resDropMen.current.classList.toggle('activeDrop')
  }
  const resMenu = useRef()
  const handleOpenResMenu = () => {
    resMenu.current.classList.toggle('activeHoverMen')
  }
  const [isOpen, setOpen] = useState(false)
  const handleCloseResMenu = (link) => {
    resMenu.current.classList.remove('activeHoverMen')
    setOpen(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    handleClickLink(link)
  }
  const { handleOpenLoginModal, prodCreateModalOpen, handleOpenRegisterModal, loading, setLoading } = useDataContext()


  const handleScrollToTop = (link) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    handleClickLink(link)
  };
  const handleClickLink = (destination) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate(destination)
    }, 3000)
  }
  const searchedValueRef = useRef()
  const searchedValueRef2 = useRef()


  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      const totalHours = days * 24 + hours;
      return <ul className="times">
        <li><span className="hours">{totalHours}h</span></li>
        <li><span className="minutes">{minutes}m</span></li>
        <li><span className="seconds">{seconds}s</span></li>
      </ul>

    }
  };

  const calculateTimeRemaining = (startTime, endTime) => {
    const currentTime = Date.now();
    const startTimeObject = new Date(startTime);
    const endTimeObject = new Date(endTime);

    const timeRemaining = Math.max(0, endTimeObject - Math.max(currentTime, startTimeObject));

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, completed: timeRemaining === 0 };
  };
  return (
    <>
      <div className={`bg-load myLoad  ${loading == false ? 'trueLoading' : ''}`}>
        <div className="load">
          <span className='load1'></span>
          <span className='load2'></span>
          <span className='load3'></span>
          <span className='load4'></span>
        </div>
      </div>
      <div className="headerTop" style={{ display: location.pathname == '/*' ? "none " : "" }}>
        <div className="container">
          <div className="headerTopContainer">
            <ul className="headerTopLeft">
              <li>
                <div className="headIcon">
                  <FaMessage />
                </div>
                <a href="#">agamaliyevallahverdii@gmail.com</a>
              </li>
              <li className='phone'>
                <div className="headIcon">
                  <FaPhoneAlt />
                </div>
                <a href="#">+994513236262</a>
              </li>
            </ul>
            <div className="headerTopRight">
              <ul className="headerSocialMedia">
                <li>
                  <a href="#" target='_blank'>
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a target='_blank' href="https://www.instagram.com/elesgerli.xs/">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTwitter />
                  </a>
                </li>
                <li className='headLinkEdin'>
                  <a href="#" >
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
              {
                userToken?.isLogin == true ? <>
                  <button className='headLogin' onClick={prodCreateModalOpen}>
                    Add Product
                  </button>
                  <button onClick={async () => {
                    await dispatch(editUser({ id: userToken?.id, newData: { status: false, isLogin: false } }))
                    dispatch(logOut())
                    toast.success('Logout successful! See you next time.');

                    navigate('/')
                  }} className='headRegister '>
                    <FaUserCircle />  Logout
                  </button></> : <>
                  <button onClick={() => {
                    handleOpenLoginModal()
                  }} className='headLogin'>
                    Login
                  </button>
                  <button onClick={handleOpenRegisterModal} className='headRegister '>
                    <FaUserCircle />  Register
                  </button></>
              }
            </div>
          </div>
        </div>
      </div>
      <header style={{ display: location.pathname == '/*' ? "none " : "" }} ref={scrollRef} className="header animate__animated   ">
        <div className="container">
          <div className="headerBottomContainer">
            <div className="headLogo">
              <Link to='/'>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="hamburger" onClick={handleOpenResMenu}>
              <Hamburger color='white' toggled={isOpen} toggle={setOpen} />
            </div>
            <ul className="headMenu">
              <li>
                <Link onClick={() => {
                  handleScrollToTop('/')
                }} to='/'>Home</Link>
              </li>
              <li>
                <Link onClick={() => {
                  handleScrollToTop('/about')
                }} to='/about'>About</Link>
              </li>
              <li>
                <Link onClick={() => {
                  handleScrollToTop('/product')
                }} to='/product'>Product</Link>
              </li>
              <li>
                <Link onClick={() => {
                  handleScrollToTop('/blog')
                }} to='/blog'>Blog</Link>
              </li>
              <li className='pages'>
                <span>Pages <IoIosArrowDown /></span>
                <ul className="dropMenu">
                  {
                    userToken?.isLogin == true ? <li className="dashboardHover">
                      <span>Dashboard <IoIosArrowDown /></span>
                      <ul className="dashboardMenu">
                        <li><Link onClick={async () => {
                          handleScrollToTop('/dashboard')
                          await dispatch(getAllUserProducts(userToken?.id))
                          await dispatch(getAllBiddersProducts(userToken?.id))


                        }} to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link onClick={async () => {
                          handleScrollToTop('/personalProfile')
                          await dispatch(getAllUserProducts(userToken?.id))

                        }} to={'/personalProfile'}>Personal Profile</Link></li>
                        <li><Link onClick={async () => {
                          handleScrollToTop('/myProducts')
                          await dispatch(getAllUserProducts(userToken?.id))
                        }} to={'/myProducts'}>My Products</Link></li>
                        <li><Link onClick={async () => {
                          handleScrollToTop('/myBid')
                          await dispatch(getAllBiddersProducts(userToken?.id))

                        }} to={'/myBid'}>My Bids</Link></li>
                        <li><Link onClick={async () => {
                          await dispatch(getAllUserWinningProduct(userToken?.id))

                          handleScrollToTop('/winningBids')
                        }} to={'/winningBids'}>Winning Bids</Link></li>
                        <li><Link onClick={() => {
                          handleScrollToTop('/myFavorites')
                        }} to={'/myFavorites'}>My Favorites</Link></li>
                        <li><Link onClick={async () => {
                          await dispatch(getAllUsersOrders(userToken?.id))
                          handleScrollToTop('/myOrders')
                        }} to={'/myOrders'}>My Orders</Link></li>
                      </ul>
                    </li> : ''
                  }


                  <li>
                    <Link onClick={() => {
                      handleScrollToTop('/faq')
                    }} to={'/faq'}>FAQ</Link>
                  </li>
                  {
                    userToken?.isAdmin == true ? <li>
                      <Link onClick={() => {
                        handleScrollToTop('/admin')
                      }} to={'/admin'}>Admin</Link>
                    </li> : ''
                  }
                  <li>
                    <Link onClick={() => {
                      handleScrollToTop('/*')
                    }} to={'*'}>Error 404</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={() => {
                  handleScrollToTop('/contacts')
                }} to='/contacts'>Contacts</Link>
              </li>
              <li className="searchIcon">
                <span onClick={handleOpenSearchBtn}>  <IoSearchSharp /></span>
                <div className="searchForm" ref={searchRef2}>
                  <span onClick={() => {
                    searchedValueRef.current.value = ""
                    handleCloseSearchBtn()
                  }} className="closeSearch"><IoClose /></span>
                  <form action="" className="searchFormInside">
                    <input type="search" placeholder='Type search' ref={searchedValueRef} onChange={(e) => {
                      dispatch(searchProducts3(e.target.value))
                    }} />
                  </form>
                </div>


              </li>

            </ul>
            {
              searchedValueRef.current && searchedValueRef.current.value.length > 0 ? <div style={{ display: searchedValueRef.current.value == '' ? 'none' : '' }} className="searchedHoverMenu">
                <div className="searchedHoverMenuInside">
                  <div className="row">
                    {
                      searchedProd?.map((item, index) => {
                        return <div key={index} className="col-md-6  pb-2">
                          <div className="upcomingAuctionCard">
                            <div className="upcomingAuctionCardLeft">
                              <img src={item.productImages.length > 0 ? `http://localhost:5050/public/${item.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />

                              <Link
                                onClick={async () => {
                                  searchedValueRef.current.value = ''
                                  handleCloseSearchBtn()
                                  await dispatch(updateProdIncreament(item._id))
                                  await dispatch(getOneProducts(item?._id))
                                  window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  });
                                }} to={`/product/${item._id}`}
                                className='details2'>
                                <img src={bidNm} alt="bid" />
                              </Link>
                            </div>
                            <div className="upcomingAuctionCardRight">
                              <h5>

                                <Link onClick={async () => {
                                  searchedValueRef.current.value = ''
                                  handleCloseSearchBtn()
                                  await dispatch(updateProdIncreament(item._id))
                                  await dispatch(getOneProducts(item?._id))
                                  window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  });
                                }} to={`/product/${item._id}`} >
                                  {item.productName}
                                </Link>
                              </h5>
                              <div className="upcomingAuctionCardRightMiddle">
                                <div className="upcomingCardLeft">
                                  <h6>
                                    price
                                  </h6>

                                  <h6 className="price2">${item.afterPrice}</h6>
                                </div>
                                <div className="upcomingCardRight">
                                  <h6>
                                    Product Type:
                                  </h6>
                                  <h6 className="aucId">
                                    {
                                      item.type == 'electronic' ? 'Electronic' :
                                        item.type == 'car' ? 'Car' :
                                          item.type == 'jewelry' ? 'Jewelry' : ''
                                    }
                                  </h6>
                                </div>

                              </div>
                              <div className="upcomingCardBottom">
                                <h6>
                                  Ends In:
                                </h6>
                                <Countdown
                                  date={new Date(item.endTime)}
                                  renderer={(props) => renderer({ ...props, ...calculateTimeRemaining(item.startTime, item.endTime) })}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div> : ''
            }

            <ul className="responsiveMenu" ref={resMenu}>
              <li>
                <Link onClick={() => {
                  handleCloseResMenu('/')
                }} to='/'>Home</Link>
              </li>
              <li>
                <Link onClick={() => {
                  handleCloseResMenu('/about')
                }} to='/about'>About</Link>
              </li>
              <li>
                <Link onClick={() => {
                  handleCloseResMenu('/product')

                }} to='/product'>Product</Link>
              </li>
              <li>
                <Link onClick={() => {
                  handleCloseResMenu('/blog')

                }} to='/blog'>Blog</Link>
              </li>
              <li className='resPages detailResPages' >
                <span onClick={handleOpenResPages}>Pages <IoIosArrowDown /></span>
                <ul className="dropMenu" ref={resDropMen}>
                  {
                    userToken?.isLogin == true ? <li className="dashboardHover" onClick={handleOpenDashboard}>
                      <span>Dashboard <IoIosArrowDown /></span>
                      <ul className="dashboardMenu" ref={dashboardRef}>
                        <li><Link onClick={async () => {
                          handleCloseResMenu('/dashboard')
                          await dispatch(getAllUserProducts(userToken?.id))
                          await dispatch(getAllBiddersProducts(userToken?.id))



                        }} to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link onClick={async () => {
                          await dispatch(getAllUserProducts(userToken?.id))
                          handleCloseResMenu('/personalProfile')


                        }} to={'/personalProfile'}>Personal Profile</Link></li>
                        <li><Link onClick={async () => {
                          handleCloseResMenu('/myProducts')
                          await dispatch(getAllUserProducts(userToken?.id))


                        }} to={'/myProducts'}>My Products</Link></li>
                        <li><Link onClick={async () => {
                          handleCloseResMenu('/myBid')
                          await dispatch(getAllBiddersProducts(userToken?.id))

                        }} to={'/myBid'}>My Bids</Link></li>
                        <li><Link onClick={async () => {
                          await dispatch(getAllUserWinningProduct(userToken?.id))

                          handleCloseResMenu('/winningBids')

                        }} to={'/winningBids'}>Winning Bids</Link></li>
                        <li><Link onClick={() => {
                          handleCloseResMenu('/myFavorites')

                        }} to={'/myFavorites'}>My Favorites</Link></li>

                        <li><Link onClick={async () => {
                          await dispatch(getAllUsersOrders(userToken?.id))
                          handleCloseResMenu('/myOrders')

                        }} to={'/myOrders'}>My Orders</Link></li>
                      </ul>
                    </li> : ''
                  }
                  <li>

                    <Link onClick={() => {
                      handleCloseResMenu('/faq')

                    }} to={'/faq'}>FAQ</Link>
                  </li>
                  {
                    userToken?.isAdmin == true ? <li>
                      <Link onClick={() => {
                        handleCloseResMenu('/admin')

                      }} to={'/admin'}>Admin</Link>
                    </li> : ''
                  }
                  <li>
                    <Link onClick={() => {
                      handleCloseResMenu('/*')

                    }} to={'*'}>Error 404</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={() => {
                  handleCloseResMenu('/contacts')

                }} to='/contacts'>Contacts</Link>
              </li>
              <li className='searchedIcon'>
                <span onClick={() => {
                  handleOpenSearch()

                }}>  <IoSearchSharp /></span>
                <div className="searchForm" ref={searchRef}>
                  <div onClick={() => {
                    searchedValueRef2.current.value = ''
                    handleCloseSearch()

                  }} className="closeSearch"><IoClose /></div>
                  <form action="" className="searchFormInside">
                    <input type="search" placeholder='Type search' ref={searchedValueRef2} onChange={(e) => {
                      dispatch(searchProducts3(e.target.value))
                    }} />
                  </form>
                </div>
              </li>
            </ul>

            {
              searchedValueRef2.current && searchedValueRef2.current.value.length > 0 ? <div className="searchedHoverMenu2">
                <div className="searchedHoverMenuInside">
                  <div className="row">
                    {
                      searchedProd?.map((item, index) => {
                        return <div key={index} className="col-md-11 m-2 pb-2">
                          <div className="upcomingAuctionCard">
                            <div className="upcomingAuctionCardLeft">
                              <img src={item.productImages.length > 0 ? `http://localhost:5050/public/${item.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />

                              <Link
                                onClick={async () => {
                                  searchedValueRef2.current.value = ''
                                  handleCloseSearchBtn()
                                  await dispatch(updateProdIncreament(item._id))
                                  await dispatch(getOneProducts(item?._id))
                                  window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  });
                                }} to={`/product/${item._id}`}
                                className='details2'>
                                <img src={bidNm} alt="bid" />
                              </Link>
                            </div>
                            <div className="upcomingAuctionCardRight">
                              <h5>

                                <Link onClick={async () => {
                                  searchedValueRef2.current.value = ''
                                  handleCloseSearchBtn()
                                  await dispatch(updateProdIncreament(item._id))
                                  await dispatch(getOneProducts(item?._id))
                                  window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                  });
                                }} to={`/product/${item._id}`} >
                                  {item.productName}
                                </Link>
                              </h5>
                              <div className="upcomingAuctionCardRightMiddle">
                                <div className="upcomingCardLeft">
                                  <h6>
                                    price
                                  </h6>

                                  <h6 className="price2">${item.afterPrice}</h6>
                                </div>
                                <div className="upcomingCardRight">
                                  <h6>
                                    Product Type:
                                  </h6>
                                  <h6 className="aucId">
                                    {
                                      item.type == 'electronic' ? 'Electronic' :
                                        item.type == 'car' ? 'Car' :
                                          item.type == 'jewelry' ? 'Jewelry' : ''
                                    }
                                  </h6>
                                </div>

                              </div>
                              <div className="upcomingCardBottom">
                                <h6>
                                  Ends In:
                                </h6>
                                <Countdown
                                  date={new Date(item.endTime)}
                                  renderer={(props) => renderer({ ...props, ...calculateTimeRemaining(item.startTime, item.endTime) })}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div> : ''
            }
          </div>
        </div>
      </header >
      <LoginModal />
      <RegisterForm />
      <UserImageModal />
      <PersonaleUpdateModel />
      <AccountSettingsModel />
      <EmailUpdateModel />
      <PhoneUpdateModal />
      <PasswordUpdateModel />
      <ForgotPassword />
      <UpdateForgotPassword />
      <AddProductModal />
      <ProductUpdateModal />
      <CheckoutModal />
      <AddBlogModal />
      <UpdateBlogModal />
      <OrderDetailModal/>
    </>

  )
}

export default Header
