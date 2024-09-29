import React from 'react'
import { useDispatch } from 'react-redux'
import './Index.scss'
import { searchProducts2, sortProducts } from '../../../redux/slices/producSlice'

const ProductsTableTop = () => {
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 productsTableTop">
                    <div className="productsTableTopInside">
                        <div className="productsTableTopInsideBox">
                            <div className="productsTableTopFilter">
                                <div className="productsTableTopFilterLeft">
                                    <input type="text" placeholder='Search Products' onChange={(e) => {
                                        dispatch(searchProducts2(e.target.value))
                                    }} />
                                </div>
                                <div className="productsTableTopFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortProducts(e.target.value))
                                    }}>
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value={'df'}>Default</option>
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
                                        <optgroup label='Product Created Time'>
                                            <option value="Latest">Latest</option>
                                            <option value="Oldest">Oldest</option>
                                        </optgroup>
                                        <optgroup label='Product End Time'>
                                            <option value="EndingSoon">Ending Soon</option>
                                            <option value="EndingLater">Ending Later</option>
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

export default ProductsTableTop
