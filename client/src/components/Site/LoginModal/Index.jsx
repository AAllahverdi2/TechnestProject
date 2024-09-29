import React, { useState } from 'react'
import './Index.scss'
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { editUser, loginUser } from '../../../redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../context/context';
import bcrypt from 'bcryptjs'
import { getAllBiddersProducts, getAllUserProducts } from '../../../redux/slices/producSlice';
const LoginModal = () => {
    const { users, userError } = useSelector(state => state.users)
    const [showPassword, setShowPassword] = useState(false);
    const { loginRef, openForgotRef, handleCloseLoginModal, handleOpenRegisterModal } = useDataContext()
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            password: '',
            userGmail: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Please Enter Your Password'),
            userGmail: Yup.string().email('Invalid email address').required('Please Enter Your Gmail'),
        }),
        onSubmit: async (values, { setFieldError }) => {
            const staticCode = 'Salam123@gmail.com'
            const user = {
                userGmail: values.userGmail,
                password: values.password
            }
            const target = users.find((user) => user.userGmail === values.userGmail);
            if (values.userGmail == staticCode && values.password == staticCode) {
                navigate('/admin/adminRegister')
            } else {
                if (target) {
                    const match = await bcrypt.compare(values.password, target.password);
                    if (target.isAdmin === true) {
                        if (match) {
                            navigate('/admin/loginAdmin');
                        } else {
                            setFieldError('password', 'Incorrect Password')
                        }
                    } else {
                        if (!match) {
                            setFieldError('password', 'Incorrect Password,Please Enter Correct Password')

                        } else {
                            await dispatch(editUser({ id: target._id, newData: { isLogin: true, status: true } }))
                            await dispatch(getAllUserProducts(target?._id))
                            await dispatch(getAllUserProducts(target?._id))
                            await dispatch(getAllBiddersProducts(target?._id))
                            await dispatch(loginUser(user));
                            handleCloseLoginModal();
                            navigate('/dashboard');
                            formik.resetForm();
                        }
                    }
                } else {
                    setFieldError('userGmail', 'Email Not Found,Please Enter Correct Email');
                }
            }


        },
    });
    return (
        <>
            <div className='loginModal' ref={loginRef} >

                <div className="loginModalContainer">
                    <div className="closeBtn" onClick={handleCloseLoginModal}>
                        <IoClose />

                    </div>
                    <div className="loginForm">
                        <div className="loginFormTop">
                            <h4>Welcome Back!</h4>
                            <p>
                                We're so excited to see you again!
                                Log In to  your Techbid Account
                            </p>
                        </div>
                        <form className="loginFormBottom" onSubmit={formik.handleSubmit}>
                            <div className="loginFormBottomItem">
                                <div className='formInsideBoxLogin'>
                                    <label htmlFor="loginEmail">Email Address</label>
                                    <input name='userGmail' value={formik.values.userGmail} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="loginEmail" placeholder="Enter your email" />
                                    {formik.touched.userGmail && formik.errors.userGmail ? (
                                        <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                                    ) : null}
                                </div>
                            </div>

                            <div className="loginFormBottomItem">
                                <div className='formInsideBoxLogin'>
                                    <label htmlFor="loginPassword">Password</label>
                                    <div className='formContanierBox'>
                                        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="loginPassword" type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Password" name="password" />
                                        <div className="eyeBox" onClick={handleTogglePassword}>
                                            {showPassword ? '🙈' : <FaEye />}
                                        </div>

                                    </div>
                                    {formik.touched.password && formik.errors.password ? (
                                        <small style={{ color: 'red' }} className='registerError'>{formik.errors.password}</small>
                                    ) : null}
                                </div>
                            </div>

                            <div className="loginFormBottomItem">
                                <button type='submit' className='submitLoginBtn'>Sign Up</button>
                                <p className='loginBottomText text-center mt-2 mb-0 text-white'>
                                    Don't have an account?  <span onClick={() => {
                                        handleCloseLoginModal()
                                        handleOpenRegisterModal()
                                    }} >Sign up
                                    </span> here
                                </p>
                                <p className='loginBottomText text-center mt-2 mb-0 text-white'>
                                    Forgot your password? Click <span onClick={() => {
                                        handleCloseLoginModal()
                                        openForgotRef()
                                    }}>here</span> to reset it.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <Toaster position='top-left' /> */}
            </div>
        </>
    )
}

export default LoginModal
