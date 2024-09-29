import React from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../redux/slices/commentSlice';
import moment from 'moment'
const CommentTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.commentedProfileImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.commentedName}
            </td>
            <td>
                {moment(item.createdAt).format('DD-M-YYYY')}

            </td>

            <td>
                <Link to={`/admin/comments/${item._id}`}>
                    <Button color='primary' >
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>

            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteComment(item._id))
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

export default CommentTableItem
