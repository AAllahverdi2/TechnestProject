import React from 'react'
import './Index.scss'
import { useDispatch } from 'react-redux'
import { searchManagement, sortManagement } from '../../../redux/slices/managementSlice'
const ManagementTop = () => {
    const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 managementTableTop">
                    <div className="managementTableTopInside">
                        <div className="managementTableTopInsideBox">
                            <div className="managementTableTopBoxFilter">
                                <div className="managementTableTopFilterLeft">
                                    <input type="text" placeholder='Search Management' onChange={(e) => {
                                        dispatch(searchManagement(e.target.value))
                                    }} />
                                </div>
                                <div className="managementTableTopFilterRight">
                                    <select onChange={(e) => {
                                        dispatch(sortManagement(e.target.value))
                                    }}>
                                        <option hidden disabled value={''} defaultValue={''} >Filter</option>
                                        <option value={'df'}>Default</option>
                                        <optgroup label='Filter By Management Title'>
                                            <option value={'A-Z'}>A-Z</option>
                                            <option value={'Z-A'}>Z-A</option>
                                        </optgroup>
                                        <optgroup label='Filter By Management Profession'>
                                            <option value={'a-z'}>A-Z</option>
                                            <option value={'z-a'}>Z-A</option>
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

export default ManagementTop
