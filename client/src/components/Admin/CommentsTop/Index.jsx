import React from 'react'
import { useDispatch } from 'react-redux'
import { searchBlog, sortBlogs } from '../../../redux/slices/blogSlice'
import { searchComment, sortComments } from '../../../redux/slices/commentSlice'

const CommentsTop = () => {
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 orderTop">
                    <div className="orderTopInside">
                        <div className="orderTopInsideBox">
                            <div className="orderTopInsideBoxFilter">
                                <div className="orderTopInsideFilterLeft">
                                    <input type="text" placeholder='Search Comment' onChange={(e) => {
                                        dispatch(searchComment(e.target.value))
                                    }} />
                                </div>
                                <div className="orderTopInsideFilterRight">
                                    <select className='form-select' onChange={(e) => {
                                        dispatch(sortComments(e.target.value))
                                    }}>
                                        <option value="df">All</option>
                                        <optgroup label='Commented User Title'>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option>
                                        </optgroup>

                                        <optgroup label='Created At'>
                                            <option value="ON">Oldest to Newest</option>
                                            <option value="NO">Newest to Oldest</option>
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

export default CommentsTop
