import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteManagement, getOneManagement } from '../../../redux/slices/managementSlice';
import moment from 'moment';
import { deleteProduct } from '../../../redux/slices/producSlice';
const ProductsTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img width={50} height={40} src={`http://localhost:5050/public/${item.productImages[0]}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.productName.slice(0, 15)}.....
            </td>
            <td>
                ${item.afterPrice}
            </td>
            <td> {moment(item.endTime).format('MM/DD/YYYY')}
            </td>

            <td>
                <Link to={`/product/${item._id}`}>
                    <Button color='primary' >
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>

            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteProduct(item._id))
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

export default ProductsTableItem
