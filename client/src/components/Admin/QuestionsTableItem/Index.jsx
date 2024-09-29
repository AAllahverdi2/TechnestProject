import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteQuestions, getOneQuestions } from '../../../redux/slices/questionsSlice';
const QuestionsTableItem = ({ item, index }) => {
    const dispatch = useDispatch()
    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                {item.questionTitle}
            </td>
            <td>
                {item.questionContent?.slice(0, 30)}....
            </td>

            <td>
                <Link to={`/admin/questionDetail/${item._id}`}>
                    <Button color='primary' >
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>
            <td>
                <Link to={`/admin/questionEdit/${item._id}`} onClick={() => {
                    dispatch(getOneQuestions(item._id))
                }}>
                    <Button color='warning'>
                        <Icon path={mdiFileEdit} size={1} />

                    </Button>
                </Link>
            </td>
            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteQuestions(item._id))
                }} className='deleteBtnInQuestions'>
                    <span className='questionFirstDelete'>
                        <Icon path={mdiDelete} size={1} />
                    </span>
                    <span className='questionSecondDelete'>
                        <Icon path={mdiDeleteEmpty} size={1} />

                    </span>
                </Button>
            </td>
        </tr>
    )
}

export default QuestionsTableItem
