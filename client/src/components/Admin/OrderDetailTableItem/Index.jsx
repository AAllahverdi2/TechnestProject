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
const OrderDetailTableItem = ({ item, index }) => {
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
            <td>
                {item.type == 'electronic' ? 'Electronic' :
                    item.type == 'jewelry' ? 'Jewelry' :
                        item.type == 'car' ? 'Card' : ''}
            </td>
            <td>
                {item.productDescription.slice(0, 15)}.....
            </td>
            <td>{item.watching}</td>
            <td> {moment(item.endTime).format('MM/DD/YYYY')}
            </td>




        </tr>
    )
}

export default OrderDetailTableItem
