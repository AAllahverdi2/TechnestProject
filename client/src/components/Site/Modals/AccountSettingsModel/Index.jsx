import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { FaEye } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { editUser } from '../../../../redux/slices/userSlice';

const AccountSettingsModel = () => {
  const { settingsUpdateRef, handleOpenUpdateSettings, handleCloseUpdateSettings } = useDataContext()

  const dispatch = useDispatch()
  const { users, oneUser, userToken } = useSelector(state => state.users)

  useEffect(() => {
    formik.setValues({
      language: oneUser?.language,
      status: oneUser?.status
    })
  }, [oneUser])
  const formik = useFormik({
    initialValues: {
      language: '',
      status: false,
    },
    validationSchema: Yup.object({
      language: Yup.string().required('Language is required'),
    }),

    onSubmit: async (values) => {
      await dispatch(editUser({ id: userToken.id, newData: { status: values.status, language: values.language } }))
      toast.success('Your Account Settings Successfully Updated')
      handleCloseUpdateSettings()
      formik.resetForm()
    },
  });
  return (
    <div className='settingUpdate' ref={settingsUpdateRef}>
      <div className="settingUpdateBox">
        <div className="closeBtn" onClick={handleCloseUpdateSettings}>
          <IoClose />

        </div>
        <div className="settingUpdateBoxInside">
          <div className="settingUpdateBoxInsideTop">
            <h4>
              Update Account Settings
            </h4>

          </div>
          <form className="settingUpdateBoxInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="settingUpdateItem">
              <div className='settingUpdateItemInside'>
                <label htmlFor="languageU">
                  Language
                </label>
                <select
                  value={formik.values.language}
                  name="language"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="languageU"
                >
                  <option value="" label="Select a language" />
                  <option value="english" label="English" />
                  <option value="russian" label="Russian" />
                  <option value="Azərbaycan" label="Azərbaycan" />
                </select>
                {formik.touched.language && formik.errors.language ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.language}</small>
                ) : null}
              </div>
            </div>
            <div className='settingUpdateItem'>
              <div className="settingUpdateItemInside2">
                <span className="prProfLeft">Status</span>
                <div className="prProfRightCheck form-check">
                  <input name="status"
                    checked={formik.values.status}
                    onChange={formik.handleChange} className="form-check-input" type="checkbox" id="flexChecku" />
                  <label className="form-check-label" htmlFor="flexChecku">
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="settingUpdateItem">
              <button type='submit' className="settingUpdateBtn">
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

export default AccountSettingsModel
