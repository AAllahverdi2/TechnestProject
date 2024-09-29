import React from 'react'
import { useDispatch } from 'react-redux'
import { searchBlog, sortBlogs } from '../../../redux/slices/blogSlice'

const BlogsTop = () => {
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 orderTop">
                    <div className="orderTopInside">
                        <div className="orderTopInsideBox">
                            <div className="orderTopInsideBoxFilter">
                                <div className="orderTopInsideFilterLeft">
                                    <input type="text" placeholder='Search Blogs' onChange={(e) => {
                                        dispatch(searchBlog(e.target.value))
                                    }} />
                                </div>
                                <div className="orderTopInsideFilterRight">
                                    <select className='form-select' onChange={(e) => {
                                        dispatch(sortBlogs(e.target.value))
                                    }}>
                                        <option value="df">All</option>
                                        <optgroup label='Poster User Title'>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option>
                                        </optgroup>
                                        <optgroup label='Blog Title'>
                                            <option value="a-z">A-Z</option>
                                            <option value="z-a">Z-A</option>
                                        </optgroup>
                                        <optgroup label='Watchers'>
                                            <option value="0-9">0-9</option>
                                            <option value="9-0">9-0</option>
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
export default BlogsTop
