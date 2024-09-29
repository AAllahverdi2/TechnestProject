import React, { useEffect } from 'react'
import './Index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Rating from '@mui/material/Rating';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getOneQuestions } from '../../../redux/slices/questionsSlice';
const QuestionDetail = () => {
    const dispatch = useDispatch()
    const { oneQuestion, questionsLoading } = useSelector(state => state.questions)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneQuestions(id))
    }, [id])
    return (
        <main className='questionDetail'>
            <Helmet>
                <title>Question Detail</title>
            </Helmet>
            <div className="questionDetailInside">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="questionDetailInsideCard">
                                {
                                    questionsLoading == true ? <p className='questionDetailSpinner'>
                                        <PacmanLoader color="#6c7293 " /></p> : <div className="questionDetailCardBox">
                                      
                                        <div className="questionDetailCardBoxBottom">
                                            <p className="questionTitle">
                                                {oneQuestion?.questionTitle}
                                            </p>
                                            <span className="questionRating">
                                                <Rating name="half-rating-read" readOnly defaultValue={oneQuestion?.questionRating} precision={0.5} />
                                            </span>
                                            <p className="questionContent">
                                                {oneQuestion?.questionContent}
                                            </p>
                                        </div>
                                        <button className="questionGoBackBtn btn btn-dark">
                                            <Link to={'/admin/questionsTable'}>
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

export default QuestionDetail
