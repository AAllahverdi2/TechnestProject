import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchBidders, sortBidders } from '../../../redux/slices/bidHistorySlice'
const BidHistoryTableTop = () => {
    const dispatch = useDispatch()

  return (
    <div className='container'>
            <div className="row">
                <div className="col-lg-12 bidTableTop">
                    <div className="bidTableTopInside">
                        <div className="bidTableTopInsideBox">
                            <div className="bidTableTopBoxFilter">
                                <div className="bidTableTopFilterLeft">
                                    <input type="text" placeholder='Search Bidders' onChange={(e) => {
                                        dispatch(searchBidders(e.target.value))
                                    }} />
                                </div>
                                <div className="bidTableTopFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortBidders(e.target.value))
                                    }}>
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value={'df'}>Default</option>
                                        <optgroup label='Filter By Bidders Name'>
                                            <option value={'A-Z'}>A-Z</option>
                                            <option value={'Z-A'}>Z-A</option>
                                        </optgroup>
                                        <optgroup label='Filter By Bidders Price'>
                                            <option value={'0-9'}>0-9</option>
                                            <option value={'9-0'}>9-0</option>
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

export default BidHistoryTableTop
