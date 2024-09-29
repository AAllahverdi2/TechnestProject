import React from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteData, getOne } from '../../../redux/slices/testimonialSlice';
import moment from 'moment';
import { deleteSubscribers } from '../../../redux/slices/subscribersSlice';
const SubscribersTableItem = ({ item, index }) => {
  const dispatch = useDispatch()
  return (
    <tr>
      <td> {index + 1}</td>
      <td>
        {item?.subscriberGmail}
      </td>
      <td>
        {moment(item?.createdAt).format('DD.MM.YYYY')}
      </td>
      <td>
        {moment(item?.createdAt).format(' h:mm:ss a')}
      </td>
      <td>
        <Button color='error' onClick={() => {
          dispatch(deleteSubscribers(item._id))
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

export default SubscribersTableItem
