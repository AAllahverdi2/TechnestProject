import React, { useEffect, useState } from 'react'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteEmpty, mdiFileEdit, mdiInformation } from '@mdi/js';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { deleteOrder, updateOrderStatus } from '../../../redux/slices/orderSlice';
import { Select } from 'antd';
const OrderTableItem = ({ item, index }) => {
    const dispatch = useDispatch()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [selectedStatus, setSelectedStatus] = useState();

    return (
        <tr>
            <td> {index + 1}</td>
            <td>
                {item.orderFirstName} {item.orderLastName}
            </td>
            <td>
                {item.orderGmail}
            </td>
            <td>
                {item.orderTotalAmount}
            </td>
            <td>
                ${item.orderTotalPrice}
            </td>
            <td>
                <Select

                    defaultValue={item.orderStatus}
                    style={{
                        width: 120,
                    }}
                    onChange={async (value) => {
                        setSelectedStatus();
                        try {
                            await dispatch(updateOrderStatus({ id: item._id, newData: { orderStatus: value } }))

                        } catch (error) {
                            console.error('Error updating order status:', error.response.data);
                        }
                    }}
                    options={[
                        {
                            value: 'Pending',
                            label: 'Pending',
                        },
                        {
                            value: 'Accept',
                            label: 'Accept',
                        },
                        {
                            value: 'Reject',
                            label: 'Reject',
                        },

                    ]}
                />
            </td>

            <td>
                <Link to={`/admin/adminOrders/${item._id}`}>
                    <Button color='primary' >
                        <Icon path={mdiInformation} size={1} />

                    </Button>
                </Link>

            </td>

            <td>
                <Button color='error' onClick={() => {
                    dispatch(deleteOrder(item._id))
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

export default OrderTableItem
