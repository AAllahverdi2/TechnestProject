import React, { useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { editUser } from '../../../redux/slices/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bcrypt from 'bcryptjs'

const ChangeAdminPass = () => {
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
    const navigate = useNavigate()
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
                    navigate('/admin')
                    formik.resetForm()
                    setShowRegisterPassword(false);
                    setShowConfirmPassword(false);
                    setShowOldPassword(false);
                }
            }



        },
    });
    return (
        <main className='changeAdmin'>
            <Helmet>
                <title>Change Admin Password</title>
            </Helmet>
            <div className="changeAdminInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className="changeAdminInsideBox">
                                <div className="changeAdminInsideBoxInside">
                                    <h4 >Change Password</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="changePassItem ">
                                            <label htmlFor="adminCOldPass">Old Password *</label>
                                            <div className="password-input">
                                                <input
                                                    type={showOldPassword ? 'text' : 'password'}
                                                    id="adminCOldPass"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.oldPassword}
                                                    name="oldPassword"
                                                />
                                                <span className="password-toggle" onClick={handleToggleRegisterOldPassword}>
                                                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {formik.touched.oldPassword && formik.errors.oldPassword ? (
                                                <small style={{ color: 'red' }} className="registerError">
                                                    {formik.errors.oldPassword}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="changePassItem ">
                                            <label htmlFor="adminNewPass">New Password *</label>
                                            <div className="password-input">
                                                <input
                                                    type={showRegisterPassword ? 'text' : 'password'}
                                                    id="adminNewPass"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.newPassword}
                                                    name="newPassword"
                                                />
                                                <span className="password-toggle" onClick={handleToggleRegisterPassword}>
                                                    {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                                <small style={{ color: 'red' }} className="registerError">
                                                    {formik.errors.newPassword}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="changePassItem ">
                                            <label htmlFor="adminConfirmPass">Confirm Password *</label>
                                            <div className="password-input">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    id="adminConfirmPass"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.confirmPassword}
                                                    name="confirmPassword"
                                                />
                                                <span className="password-toggle" onClick={handleToggleConfirmPassword}>
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                <small style={{ color: 'red' }} className="registerError">
                                                    {formik.errors.confirmPassword}
                                                </small>
                                            ) : null}
                                        </div>

                                        <div className="questionBtn  ">
                                            <button type='submit ' className='btn btn-outline-warning  w-100'>
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ChangeAdminPass
