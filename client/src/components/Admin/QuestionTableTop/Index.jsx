import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchQuestions, sortQuestions } from '../../../redux/slices/questionsSlice'
const QuestionTableTop = () => {
    const dispatch = useDispatch()
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 questionTableTop">
                    <div className="questionTableTopInside">
                        <div className="questionTableTopInsideBox">
                            <div className="questionTableTopFilter">
                                <div className="questionTableTopFilterLeft">
                                    <input type="text" placeholder='Search Testimonial' onChange={(e) => {
                                        dispatch(searchQuestions(e.target.value))
                                    }} />
                                </div>
                                <div className="questionTableTopFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortQuestions(e.target.value))
                                    }}>
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value={'df'}>Default</option>
                                        <option value={'A-Z'}>A-Z</option>
                                        <option value={'Z-A'}>Z-A</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionTableTop
