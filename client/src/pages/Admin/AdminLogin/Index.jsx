import React, { useState } from 'react'
import './Index.scss'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { editUser, loginUser } from '../../../redux/slices/userSlice';
import bcrypt from 'bcryptjs'
import { getAllUserProducts } from '../../../redux/slices/producSlice';

const AdminLogin = () => {
    const { users, userError } = useSelector(state => state.users)
    const [showPassword, setShowPassword] = useState(false);
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
            const user = {
                userGmail: values.userGmail,
                password: values.password
            }
            const target = users.find((user) => user.userGmail === values.userGmail);
            if (target) {
                const match = await bcrypt.compare(values.password, target.password);

                if (target.isAdmin === true) {
                    if (!match) {
                        setFieldError('password', 'Incorrect Password,Please Enter Correct Password')

                    } else {
                        await dispatch(editUser({ id: target._id, newData: { isLogin: true, status: true } }))
                        await dispatch(getAllUserProducts(target?._id))

                        await dispatch(loginUser(user));
                        navigate('/admin');
                        formik.resetForm();
                    }
                } else if (target.isAdmin == false) {
                    navigate('/')
                }
            } else {
                setFieldError('userGmail', 'Email Not Found,Please Enter Correct Email')
            }
        }

    });
    return (
        <main className='adminLogin'>
            <div className="adminLoginInside">
                <div className='row w-100 m-0'>
                    <div className="adminLoginInsideBox d-flex align-items-center">
                        <div className='adminLoginCard col-lg-4 mx-auto'>
                            <div className="adminLoginCardInside">
                                <h3 className="adminLoginTitle text-left mb-3">
                                    Login
                                </h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="adminLoginGroup">
                                        <label htmlFor="adminLogGm">Email *</label>
                                        <input type="text" id='adminLogGm' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userGmail} name='userGmail' />
                                        {formik.touched.userGmail && formik.errors.userGmail ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                                        ) : null}
                                    </div>
                                    <div className="adminLoginGroup">
                                        <label htmlFor="adminLogPass">Password *</label>
                                        <div className="password-input">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="adminLogPass"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                name="password"
                                            />
                                            <span className="password-toggle" onClick={handleTogglePassword}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        {formik.touched.password && formik.errors.password ? (
                                            <small style={{ color: 'red' }} className="registerError">
                                                {formik.errors.password}
                                            </small>
                                        ) : null}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className=" adminLoginSubmit ">Login</button>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminLogin
