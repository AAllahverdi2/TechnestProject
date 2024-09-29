import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchOrder, sortOrder } from '../../../redux/slices/orderSlice'


const OrdersTop = () => {
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 orderTop">
                    <div className="orderTopInside">
                        <div className="orderTopInsideBox">
                            <div className="orderTopInsideBoxFilter">
                                <div className="orderTopInsideFilterLeft">
                                    <input type="text" placeholder='Search Order' onChange={(e) => {
                                        dispatch(searchOrder(e.target.value))
                                    }} />
                                </div>
                                <div className="orderTopInsideFilterRight">
                                    <select className='form-select' onChange={(e) => {
                                        dispatch(sortOrder(e.target.value))
                                    }}>
                                        <option value="df">All</option>
                                        <optgroup label='User Title'>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option>
                                        </optgroup>
                                        <optgroup label='Total Price'>
                                            <option value="0-9">0-9</option>
                                            <option value="9-0">9-0</option>
                                        </optgroup>
                                        <optgroup label='Order Status'>
                                            <option value="Pending">Pending</option>
                                            <option value="Accept">Accept</option>
                                            <option value="Reject">Reject</option>
                                        </optgroup>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersTop
