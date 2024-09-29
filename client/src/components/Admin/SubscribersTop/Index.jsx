import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchSubscribers, sortSubscribers } from '../../../redux/slices/subscribersSlice'
const SubscribersTop = () => {
    const dispatch = useDispatch()
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 subscribersTableTop">
                    <div className="subscribersTableTopInside">
                        <div className="subscribersTableTopInsideBox">
                            <div className="subscribersTableTopBoxInside">
                                <div className="subscribersTableTopInsideLeft">
                                    <input type="text" placeholder='Search Subscribers' onChange={(e) => {
                                        dispatch(searchSubscribers(e.target.value))
                                    }} />
                                </div>
                                <div className="subscribersTableTopInsideRight">
                                    <select onChange={(e) => {
                                        dispatch(sortSubscribers(e.target.value))
                                    }}>
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value={'df'}>Default</option>
                                        <option value={'A-Z'}>A-Z</option>
                                        <option value={'Z-A'}>Z-A</option>

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

export default SubscribersTop
