import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { editUser } from '../../../../redux/slices/userSlice';
const EmailUpdateModel = () => {
  const { gmailRef, handleUpdateGmail, handleRemoveUpdateGmail } = useDataContext()

  const dispatch = useDispatch()
  const { users, oneUser, userToken } = useSelector(state => state.users)
  useEffect(() => {
    formik.setValues({
      userGmail: oneUser?.userGmail,
    })
  }, [oneUser])
  const formik = useFormik({
    initialValues: {
      userGmail: '',
    },
    validationSchema: Yup.object({
      userGmail: Yup.string().email('Invalid email address').required('Email is required'),

    }),

    onSubmit: async (values) => {
      const emailExists = users.some(user => user.userGmail === values.userGmail);

      if (emailExists) {
        toast.error('Email already exists. Please use a different email address.');
      } else {
       await dispatch(editUser({ id: userToken.id, newData: { userGmail: values.userGmail } }))
        toast.success('Your Gmail Successfully Updated')
        handleRemoveUpdateGmail()
        formik.resetForm()
      }
    },
  });
  return (
    <div className='gmailModal' ref={gmailRef} >
      <div className="gmailModalBox">
        <div className="closeBtn" onClick={handleRemoveUpdateGmail}>
          <IoClose />

        </div>
        <div className="gmailModalBoxInside">
          <div className="gmailModalBoxInsideTop">
            <h4>
              Update Gmail
            </h4>

          </div>
          <form className="gmailModalBoxInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="gmailModalBoxInsideItem">
              <div className='gmailModalBoxItemInside'>
                <label htmlFor="registerEmailU">
                  Email Address
                </label>
                <input value={formik.values.userGmail} name='userGmail' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerEmailU" placeholder="Enter Your Email" />
                {formik.touched.userGmail && formik.errors.userGmail ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                ) : null}
              </div>

            </div>

            <div className="gmailModalBoxInsideItem">
              <button type='submit' className="gmailBtn">
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

export default EmailUpdateModel
