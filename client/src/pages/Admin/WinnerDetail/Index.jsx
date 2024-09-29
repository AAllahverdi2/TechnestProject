import React, { useEffect } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Rating from '@mui/material/Rating';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getOneWinner } from '../../../redux/slices/winnersSlice'
const WinnerDetail = () => {
    const dispatch = useDispatch()
    const { oneWinner, winnerLoading } = useSelector(state => state.winners)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneWinner(id))
    }, [id])
    return (
        <main className='winnerDetail'>
            <Helmet>
                <title>Winner Detail</title>
            </Helmet>
            <div className="winnerDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="winnerDetailInsideCard">
                                {
                                    winnerLoading == true ? <p className='winnerDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="winnerDetailInsideCardBox">
                                        <div className="winnerDetailInsideBoxTop">
                                            <img src={`http://localhost:5050/public/${oneWinner?.winnerImage}`} alt="" />

                                        </div>
                                        <div className="winnerDetailInsideBoxBottom">
                                            <p className="winnerTitle">
                                                {oneWinner?.winnerTitle}
                                            </p>
                                            <span className="winnerRating">
                                                <Rating name="half-rating-read" readOnly defaultValue={oneWinner?.winnerRating} precision={0.5} />
                                            </span>
                                        </div>
                                        <button className="goBackWinnerBtn btn btn-dark">
                                            <Link to={'/admin/winnersTable'}>
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

export default WinnerDetail
