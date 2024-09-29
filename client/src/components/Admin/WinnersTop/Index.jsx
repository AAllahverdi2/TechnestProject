import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchWinner, sortWinner } from '../../../redux/slices/winnersSlice'
const WinnerTop = () => {
    const dispatch = useDispatch()
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 winnerTop">
                    <div className="winnerTopInside">
                        <div className="winnerTopInsideBox">
                            <div className="winnerTopInsideBoxFilter">
                                <div className="winnerTopInsideFilterLeft">
                                    <input type="text" placeholder='Search Testimonial' onChange={(e) => {
                                        dispatch(searchWinner(e.target.value))
                                    }} />
                                </div>
                                <div className="winnerTopInsideFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortWinner(e.target.value))
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

export default WinnerTop
