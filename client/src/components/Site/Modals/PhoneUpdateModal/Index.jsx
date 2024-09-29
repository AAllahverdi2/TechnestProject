import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { editUser } from '../../../../redux/slices/userSlice';
const PhoneUpdateModal = () => {
  const { phoneRef, handleUpdatePhone, handleRemoveUpdatePhone } = useDataContext()

  const dispatch = useDispatch()
  const { users, oneUser, userToken } = useSelector(state => state.users)
  useEffect(() => {
    formik.setValues({
      phoneNumber: oneUser?.phoneNumber
    })
  }, [oneUser])
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().required('Phone Number is required'),
    }),

    onSubmit: async (values) => {
    await  dispatch(editUser({ id: userToken.id, newData: { phoneNumber: values.phoneNumber } }))
      toast.success('Your Number Successfully Updated')
      handleRemoveUpdatePhone()
      formik.resetForm()
    },
  });
  return (
    <div className='phoneUpdateModal' ref={phoneRef} >
      <div className="phoneUpdateBox">
        <div className="closeBtn" onClick={handleRemoveUpdatePhone}>
          <IoClose />

        </div>
        <div className="phoneUpdateBoxInside">
          <div className="phoneUpdateBoxInsideTop">
            <h4>
              Update Phone Number
            </h4>

          </div>
          <form className="phoneUpdateBoxInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="phoneUpdateBoxInsideItem">
              <div className='phoneUpdateBoxItemInside'>
                <label htmlFor="phoneNumberU">
                  Phone Number
                </label>
                <input value={formik.values.phoneNumber} name='phoneNumber' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="phoneNumberU" placeholder="Enter Your Phone Number" />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.phoneNumber}</small>
                ) : null}
              </div>


            </div>

            <div className="phoneUpdateBoxInsideItem">
              <button type='submit' className="phoneUpdateBtn">
                Update
              </button>

            </div>
          </form>
        </div>
      </div>
      <Toaster position='top-left' />
    </div>
  )
}

export default PhoneUpdateModal
