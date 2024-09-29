import React, { useEffect } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getOneComment } from '../../../redux/slices/commentSlice';
import moment from 'moment'
const CommentsDetail = () => {
    const dispatch = useDispatch()
    const { oneComment, loading } = useSelector(state => state.comments)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneComment(id))
    }, [id])
    return (
        <main className='testimonialDetail'>
            <Helmet>
                <title>Comment Detail</title>
            </Helmet>
            <div className="testimonialDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="testimonialDetailInsideCard">
                                {
                                    loading == true ? <p className='testimonialDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="testimonialDetailCardBox">
                                        <div className="testimonialDetailCardTop">
                                            <img src={`http://localhost:5050/public/${oneComment?.commentedProfileImage}`} alt="" />
                                            <div className="testimonialAbout">
                                                <p>
                                                    {oneComment?.commentedName}
                                                </p>
                                                <span>
                                                    {moment(oneComment?.createdAt).format('DD-M-YYYY')}

                                                </span>
                                            </div>
                                        </div>
                                        <div className="testimonialDetailCardBottom">
                                            <p className="testimonialTitle">
                                                {oneComment?.posterUserGmail}
                                            </p>

                                            <p className="testimonialDescription">
                                                {oneComment?.commentContent}
                                            </p>
                                        </div>
                                        <button className="goBackTestimonialBtn btn btn-dark">
                                            <Link to={'/admin/comments'}>
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

export default CommentsDetail
