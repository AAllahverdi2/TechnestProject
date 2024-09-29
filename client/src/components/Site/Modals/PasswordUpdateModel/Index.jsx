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
import bcrypt from 'bcryptjs'

const PasswordUpdateModel = () => {
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const handleToggleRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleToggleRegisterOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const { passwordModalRef, handleUpdatePassword, handleRemoveUpdatePassword } = useDataContext()

  const dispatch = useDispatch()
  const { users, oneUser, userToken } = useSelector(state => state.users)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),
      newPassword: Yup.string().required('New Password is required').matches(passwordRegex, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),

    onSubmit: async (values, { setSubmitting, setFieldError }) => {

      const target = users.find(user => user.userGmail == userToken?.userGmail)

      if (values.confirmPassword !== values.newPassword) {
        toast.error('Passwords do not match');
      } else {
        const match = await bcrypt.compare(values.oldPassword, target?.password);
        if (!match) {
          setFieldError('oldPassword', 'Old password is incorrect');

        } else {
          await dispatch(editUser({ id: userToken?.id, newData: { oldPassword: values.oldPassword, newPassword: values.newPassword } }))
          toast.success('Password successfully updated')
          handleRemoveUpdatePassword()
          formik.resetForm()
          setShowRegisterPassword(false);
          setShowConfirmPassword(false);
          setShowOldPassword(false);
        }
      }


    },
  });
  return (
    <div className='passwordUpdate' ref={passwordModalRef}>
      <div className="passwordUpdateBox">
        <div className="closeBtn" onClick={handleRemoveUpdatePassword}>
          <IoClose />

        </div>
        <div className="passwordUpdateBoxInside">
          <div className="passwordUpdateBoxInsideTop">
            <h4>
              Password Update
            </h4>
          </div>
          <form className="passwordUpdateBoxInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="passwordUpdateItem">
              <div className='passwordUpdateItemInside'>
                <label htmlFor="oldPassword">Old Password</label>
                <div className='passwordUpdateContainer'>
                  <input value={formik.values.oldPassword} name='oldPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} id="oldPassword" type={showOldPassword ? 'text' : 'password'} className="form-control" placeholder="Old Password" />
                  <div className="eyeBox" onClick={handleToggleRegisterOldPassword}>
                    {showOldPassword ? '🙈' : <FaEye />}
                  </div>

                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.oldPassword}</small>
                ) : null}
              </div>
            </div>
            <div className="passwordUpdateItem">
              <div className='passwordUpdateItemInside'>
                <label htmlFor="registerPasswordU">New Password</label>
                <div className='passwordUpdateContainer'>
                  <input value={formik.values.newPassword} name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} id="registerPasswordU" type={showRegisterPassword ? 'text' : 'password'} className="form-control" placeholder="New Password" />
                  <div className="eyeBox" onClick={handleToggleRegisterPassword}>
                    {showRegisterPassword ? '🙈' : <FaEye />}
                  </div>

                </div>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <small style={{ color: 'red' }} className='registerError'>{formik.errors.newPassword}</small>
                ) : null}
              </div>
            </div>
            <div className="passwordUpdateItem">
              <div className='passwordUpdateItemInside'>
                <label htmlFor="registerConfirmPasswordU">Confirm Password</label>
                <div className='passwordUpdateContainer'>
                  <input value={formik.values.confirmPassword} name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} id="registerConfirmPasswordU" type={showConfirmPassword ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" />
                  <div className="eyeBox" onClick={handleToggleConfirmPassword}>
                    {showConfirmPassword ? '🙈' : <FaEye />}
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.confirmPassword}</small>
                  ) : null}
                </div>
              </div>
            </div>


            <div className="passwordUpdateItem">
              <button type='submit' className="passwordUpdateBtn">
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

export default PasswordUpdateModel
