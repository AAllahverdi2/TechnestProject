import React, { useState } from 'react'
import './Index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { postResetPassword } from '../../../../redux/slices/userSlice';
const ForgotPassword = () => {
    const { users, userError } = useSelector(state => state.users)
    const { forgotRef, openForgotRef, closeForgotRef } = useDataContext()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            userGmail: '',
        },
        validationSchema: Yup.object({
            userGmail: Yup.string().email('Invalid email address').required('Please Enter Your Gmail'),
        }),
        onSubmit: async (values) => {
            await dispatch(postResetPassword(values))
            toast.success('An email with instructions to reset your password has been sent. Please check your inbox')
            closeForgotRef()
            formik.resetForm()
        },
    });
    return (
        <div className='forgot' ref={forgotRef} >

            <div className="forgotModal">
                <div className="closeBtn" onClick={closeForgotRef}>
                    <IoClose />
                </div>
                <div className="forgotForm">
                    <div className="forgotFormTop">
                        <h4>Forgot Your Password?</h4>
                        <p>
                            Please provide your registered email address to receive instructions on how to reset your password.
                        </p>
                    </div>
                    <form className="forgotFormBottom" onSubmit={formik.handleSubmit}>
                        <div className="forgotFormBottomItem">
                            <div className='forgotFormBottomItemInside'>
                                <label htmlFor="loginEmailP">Email Address</label>
                                <input name='userGmail' value={formik.values.userGmail} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="loginEmailP" placeholder="Enter your email" />
                                {formik.touched.userGmail && formik.errors.userGmail ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                                ) : null}
                            </div>
                        </div>

                        <div className="forgotFormBottomItem">
                            <button type='submit' className='submitLoginBtn'>Send Mail</button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position='top-left' />
        </div>
    )
}

export default ForgotPassword
