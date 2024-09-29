import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../redux/slices/userSlice';
import toast from 'react-hot-toast';
const UserAdminTableTop = ({ item, index }) => {
    const { userToken } = useSelector(state => state.users)
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.profileImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.firstName}
            </td>
            <td>
                {item.lastName}
            </td>
            <td>
                {item.userGmail}
            </td>

            <td>
                <Link to={`/admin/userDetail/${item._id}`}>
                    <Button color='primary'>
                        <Icon path={mdiInformation} size={1} />
                    </Button>
                </Link>

            </td>

            <td style={{ display: userToken?.superAdmin == true ? '' : 'none' }}>
                <Button color='error' onClick={async () => {
                    await dispatch(deleteUser(item._id))
                    toast.success('User Successfully Deleted')

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

export default UserAdminTableTop
