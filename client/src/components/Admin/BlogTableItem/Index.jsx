import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteData, getOne } from '../../../redux/slices/testimonialSlice';
import { deleteBlog } from '../../../redux/slices/blogSlice';
import moment from 'moment';
const BlogTableItem = ({ item, index }) => {
    const dispatch = useDispatch()
    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.blogImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.blogTitle2.slice(0, 30)}......
            </td>
            <td>
                {item.posterName.slice(0,25)}...
            </td>
            <td>
                {item.watchers}
            </td>
            <td>
            {moment(item.createdAt).format('DD-M-YYYY')}
            </td>
            <td>
                <Link to={`/blog/${item._id}`}>
                    <Button color='primary' >
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>

            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteBlog(item._id))
                }} className='deleteBtnInTestimonials'>
                    <span className='testimonialFirstDelete'>
                        <Icon path={mdiDelete} size={1} />
                    </span>
                    <span className='testimonialSecondDelete'>
                        <Icon path={mdiDeleteEmpty} size={1} />

                    </span>
                </Button>
            </td>
        </tr>
    )
}

export default BlogTableItem
