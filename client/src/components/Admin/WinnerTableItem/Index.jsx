import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteWinner, getOneWinner } from '../../../redux/slices/winnersSlice';
const WinnerTableItem = ({ item, index }) => {
    const dispatch = useDispatch()
    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                <img src={`http://localhost:5050/public/${item.winnerImage}`} className='winnerImage' alt="" />
            </td>
            <td>
                {item.winnerTitle}
            </td>

            <td>
                <Link to={`/admin/winnerDetail/${item._id}`}>
                    <Button color='primary' onClick={() => { }}>
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>
            <td>
                <Link to={`/admin/winnerEdit/${item._id}`} onClick={() => {
                    dispatch(getOneWinner(item._id))
                }}>
                    <Button color='warning'>
                        <Icon path={mdiFileEdit} size={1} />

                    </Button>
                </Link>
            </td>
            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteWinner(item._id))
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

export default WinnerTableItem
