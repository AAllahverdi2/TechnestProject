import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchWinningProduct2, sortProducts2 } from '../../../redux/slices/winningProductSlice'
const WinningProductsTop = () => {
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 winningProductsss">
                    <div className="winningProductInside">
                        <div className="winningProductInsideBox">
                            <div className="winningProductInsideBoxFilter">
                                <div className="winningProductInsideFilterLeft">
                                    <input type="text" placeholder='Search Winning Product' onChange={(e) => {
                                        dispatch(searchWinningProduct2(e.target.value))
                                    }} />
                                </div>
                                <div className="winningProductInsideFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortProducts2(e.target.value))
                                    }} >
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value="df">All</option>
                                        <optgroup label='Product Name'>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option>
                                        </optgroup>
                                        <optgroup label='Product Price'>
                                            <option value="0-9">0-9</option>
                                            <option value="9-0">9-0</option>
                                        </optgroup>
                                        <optgroup label='Product Type'>
                                            <option value="Electronic">Electronic</option>
                                            <option value="Jewelry">Jewelry</option>
                                            <option value="Car">Car</option>
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

export default WinningProductsTop
