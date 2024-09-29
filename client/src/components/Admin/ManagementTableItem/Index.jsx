import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteManagement, getOneManagement } from '../../../redux/slices/managementSlice';
const ManagementTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.managementImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.managementTitle}
            </td>
            <td>
                {item.managementProfession}
            </td>

            <td>
                <Link to={`/admin/managementDetail/${item._id}`}>
                    <Button color='primary' onClick={() => { }}>
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>
            <td>
                <Link to={`/admin/managementEdit/${item._id}`} onClick={() => {
                    dispatch(getOneManagement(item._id))
                }}>
                    <Button color='warning'>
                        <Icon path={mdiFileEdit} size={1} />

                    </Button>
                </Link>
            </td>
            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteManagement(item._id))
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

export default ManagementTableItem
