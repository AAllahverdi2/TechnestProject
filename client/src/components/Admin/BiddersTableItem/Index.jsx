import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteBid } from '../../../redux/slices/bidHistorySlice';
const BiddersTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img width={50} height={50 } style={{borderRadius:'50%'}} src={`http://localhost:5050/public/${item.bidHistoryProfImage}`} className='userImageTestimonials' alt="" />
            </td>
            <td>
                {item.bidderName}
            </td>
            <td>
                ${item.productBidPrice}
            </td>

         
            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteBid(item._id))
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

export default BiddersTableItem
