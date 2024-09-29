import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteWinningProduct } from '../../../redux/slices/winningProductSlice';
import moment from 'moment';
import toast from 'react-hot-toast';
const WinningProductTableItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.product[0].productImages[0]}`} className='winnerImage' alt="" />
            </td>
            <td>
                {item.winnerName}
            </td>
            <td>
                {
                    item?.product?.map((item, index) => {
                        return <span>${item.afterPrice}</span>
                    })
                }
            </td>
            <td>
                {moment(item?.product[0]?.endTime).format('DD.MM.YYYY')}
            </td>
            <td>
                <Link to={`/winningBids/${item._id}`}>
                    <Button color='primary' >
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>

            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteWinningProduct(item._id))
                    toast.success('Winning Bid Successfully Deleted');
                }} className='deleteBtnWinner'>
                    <span className='deleteBtnWinner1'>
                        <Icon path={mdiDelete} size={1} />
                    </span>
                    <span className='deleteBtnWinner2'>
                        <Icon path={mdiDeleteEmpty} size={1} />

                    </span>
                </Button>
            </td>
        </tr>
    )
}

export default WinningProductTableItem
