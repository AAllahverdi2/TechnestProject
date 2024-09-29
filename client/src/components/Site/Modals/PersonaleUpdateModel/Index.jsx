import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { editUser } from '../../../../redux/slices/userSlice';

const PersonaleUpdateModel = () => {
  const { profUpdateRef, handleCloseProfUpdate, handleOpenProfUpdate } = useDataContext()

  const dispatch = useDispatch()
  const { users, userToken, oneUser } = useSelector(state => state.users)

  useEffect(() => {
    formik.setValues({
      firstName: oneUser?.firstName,
      lastName: oneUser?.lastName,
      birthdayDay: oneUser?.birthdayDay,
      birthdayMonth: oneUser?.birthdayMonth,
      birthdayYear: oneUser?.birthdayYear,
      address: oneUser?.address,
    })
  }, [oneUser])
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthdayDay: '',
      birthdayMonth: '',
      birthdayYear: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      address: Yup.string().required('Address is required'),
      birthdayDay: Yup.string().required('Required'),
      birthdayMonth: Yup.string().required(' Required'),
      birthdayYear: Yup.string().required('Required'),
    }),

    onSubmit: async (values) => {

      const update = { address: values.address, firstName: values.firstName, lastName: values.lastName, birthdayDay: values.birthdayDay, birthdayMonth: values.birthdayMonth, birthdayYear: values.birthdayYear }
      await dispatch(editUser({ id: userToken.id, newData: update }))
      handleCloseProfUpdate()
      toast.success('Your Personal Information Successfully Updated')
      formik.resetForm()

    },
  });
  return (
    <div className='profUpdate' ref={profUpdateRef}>
      <div className="profUpdateBox">
        <div className="closeBtn" onClick={handleCloseProfUpdate}>
          <IoClose />

        </div>
        <div className="profUpdateBoxInside">
          <div className="profUpdateBoxInsideTop">
            <h4>
              Update Personal Detail
            </h4>
          </div>
          <form className="profUpdateBoxInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="profUpdateBoxItem">
              <div className='profUpdateBoxItemInside'>
                <label htmlFor="registerFnameU">
                  First Name
                </label>
                <input value={formik.values.firstName} name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerFnameU" placeholder="First Name" />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.firstName}</small>
                ) : null}
              </div>


            </div>

            <div className="profUpdateBoxItem">
              <div className='profUpdateBoxItemInside'>
                <label htmlFor="registerLnameU">
                  Last Name
                </label>
                <input value={formik.values.lastName} name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerLnameU" placeholder="Last Name" />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.lastName}</small>
                ) : null}        </div>
            </div>

            <div className="profUpdateBoxItem">
              <div className='profUpdateBoxItemInside'>
                <label htmlFor="registerAddressU">
                  Address
                </label>
                <input value={formik.values.address} name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerAddressU" placeholder="Enter Your Address" />
                {formik.touched.address && formik.errors.address ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.address}</small>
                ) : null}                      </div>
            </div>

            <div className="profUpdateBoxItem">
              <div className='profUpdateBoxItemInside'>
                <label>
                  Your Birthday
                </label>
                <div className="row row-gap-3">
                  <div className="col-md-3">
                    <input value={formik.values.birthdayDay} name='birthdayDay' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" min={1} max={31} placeholder="Day" />
                    {formik.touched.birthdayDay && formik.errors.birthdayDay ? (
                      <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayDay}</small>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <select
                      value={formik.values.birthdayMonth}
                      name="birthdayMonth"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" label="Select a month" />
                      <option value="01" label="January" />
                      <option value="02" label="February" />
                      <option value="03" label="March" />
                      <option value="04" label="April" />
                      <option value="05" label="May" />
                      <option value="06" label="June" />
                      <option value="07" label="July" />
                      <option value="08" label="August" />
                      <option value="09" label="September" />
                      <option value="10" label="October" />
                      <option value="11" label="November" />
                      <option value="12" label="December" />
                    </select>
                    {formik.touched.birthdayMonth && formik.errors.birthdayMonth ? (
                      <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayMonth}</small>
                    ) : null}
                  </div>
                  <div className="col-md-3">
                    <input value={formik.values.birthdayYear} min={1940} max={2024} name='birthdayYear' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" placeholder="Year" />
                    {formik.touched.birthdayYear && formik.errors.birthdayYear ? (
                      <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayYear}</small>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="profUpdateBoxItem">
              <button type='submit' className="profUpdateIn">
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

export default PersonaleUpdateModel
