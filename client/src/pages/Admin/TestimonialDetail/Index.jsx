import React, { useEffect } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOne } from '../../../redux/slices/testimonialSlice'
import Rating from '@mui/material/Rating';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const TestimonialDetail = () => {
    const dispatch = useDispatch()
    const { oneData, loading } = useSelector(state => state.testimonial)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOne(id))
    }, [id])
    return (
        <main className='testimonialDetail'>
            <Helmet>
                <title>Testimonial Detail</title>
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
                                            <img src={`http://localhost:5050/public/${oneData?.userImage}`} alt="" />
                                            <div className="testimonialAbout">
                                                <p>
                                                    {oneData?.userTitle}
                                                </p>
                                                <span>
                                                    {oneData?.userProfession}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="testimonialDetailCardBottom">
                                            <p className="testimonialTitle">
                                                {oneData?.testimonialTitle}
                                            </p>
                                            <span className="testimonialRating">
                                                <Rating name="half-rating-read" readOnly defaultValue={oneData?.testimonialRating} precision={0.5} />
                                            </span>
                                            <p className="testimonialDescription">
                                                {oneData?.description}
                                            </p>
                                        </div>
                                        <button className="goBackTestimonialBtn btn btn-dark">
                                            <Link to={'/admin/testimonialsTable'}>
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

export default TestimonialDetail
