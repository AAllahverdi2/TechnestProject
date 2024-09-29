import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteData, getOne } from '../../../redux/slices/testimonialSlice';
const TestimonialsTableItem = ({ item, index }) => {
    const dispatch = useDispatch()
    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.userImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.userTitle}
            </td>
            <td>
                {item.testimonialTitle}
            </td>

            <td>
                <Link to={`/admin/testimonialDetail/${item._id}`}>
                    <Button color='primary' onClick={() => { }}>
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>
            <td>
                <Link to={`/admin/testimonialEdit/${item._id}`} onClick={() => {
                    dispatch(getOne(item._id))
                }}>
                    <Button color='warning'>
                        <Icon path={mdiFileEdit} size={1} />

                    </Button>
                </Link>
            </td>
            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteData(item._id))
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

export default TestimonialsTableItem
