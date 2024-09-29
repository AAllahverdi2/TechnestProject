import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchTestimonial, sortTestimonial } from '../../../redux/slices/testimonialSlice'
const TestimonialTableTop = () => {
    const dispatch = useDispatch()
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 testimonialTableTop">
                    <div className="testimonialTableTopInside">
                        <div className="testimonialTableTopInsideBox">
                            <div className="testimonialTableTopFilter">
                                <div className="testimonialTableTopFilterLeft">
                                    <input type="text" placeholder='Search Testimonial' onChange={(e) => {
                                        dispatch(searchTestimonial(e.target.value))
                                    }} />
                                </div>
                                <div className="testimonialTableTopFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortTestimonial(e.target.value))
                                    }}>
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value={'df'}>Default</option>
                                        <optgroup label='Filter By User Title'>
                                            <option value={'A-Z'}>A-Z</option>
                                            <option value={'Z-A'}>Z-A</option>
                                        </optgroup>
                                        <optgroup label='Filter By Testimonial Title'>
                                            <option value={'a-z'}>A-Z</option>
                                            <option value={'z-a'}>Z-A</option>
                                        </optgroup>

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

export default TestimonialTableTop
