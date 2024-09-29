import React, { useEffect } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { editUser, getOneUser } from '../../../redux/slices/userSlice'
import toast from 'react-hot-toast';
const UserDetail = () => {
    const dispatch = useDispatch()
    const { oneUser, userLoading, userToken } = useSelector(state => state.users)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneUser(id))
    }, [id])
    return (
        <main className='userDetail'>
            <Helmet>
                <title>User Detail</title>
            </Helmet>
            <div className="userDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="userDetailInsideCard">
                                {
                                    userLoading == true ? <p className='userDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="userDetailCardBox">
                                        <div className="userDetailCardBoxTop">
                                            <div className="userDetailImage">
                                                <img src={`http://localhost:5050/public/${oneUser?.profileImage}`} alt="" />
                                                <span className={`${oneUser?.status == true ? 'statusUserDetail' : 'statusUserDetailOff'}`}>

                                                </span>
                                            </div>
                                        </div>
                                        <div className="userDetailCardBoxBottom">
                                            <div className="row mb-3">
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleT">
                                                        First Name
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.firstName}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleT">
                                                        Last Name
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.lastName}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleT">
                                                        Gmail
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.userGmail}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleT">
                                                        Address
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.address}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleT">
                                                        Birthday
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.birthdayDay}-{oneUser?.birthdayMonth}-{oneUser?.birthdayYear}
                                                    </span>
                                                </div>

                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleTT">
                                                        Number
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.phoneNumber}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleTT">
                                                        Active Bids
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.activeBids}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleTT">
                                                        Winning Bids
                                                    </span>
                                                    <span className="userTitle">
                                                        {oneUser?.winningBids}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleTT">
                                                        Wishlist                                                     </span>
                                                    <span className="userTitle">
                                                        {oneUser?.bidsInWishlist}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <span className="userTitleTT">
                                                        Language                                                     </span>
                                                    <span className="userTitle">
                                                        {oneUser?.language == 'russian' ? 'Russian' :
                                                            oneUser?.language == 'english' ? 'English' :
                                                                oneUser?.language == 'Azərbaycan' ? 'Azərbaycan' : ''}
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                        <button className="goBackUserPage btn btn-dark">
                                            <Link to={'/admin/users'}>
                                                Go Back
                                            </Link>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default UserDetail
