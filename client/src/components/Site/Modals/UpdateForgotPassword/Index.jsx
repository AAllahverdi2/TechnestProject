import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { FaEye } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { editUser, editUserPassword } from '../../../../redux/slices/userSlice';
import { useLocation, useNavigate, useParams } from 'react-router';
import { jwtDecode } from 'jwt-decode';
const UpdateForgotPassword = () => {
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleToggleRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const { updateRessPass, openUpdatePassModal, closeUpdatePassModal } = useDataContext()
    const location = useLocation();
    const [decodeUser, setDecodeUser] = useState(null)
    const [userResetToken, setUserResetToken] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        if (token) {
            setUserResetToken(token)
            const decode = jwtDecode(token)
            setDecodeUser(decode)
        }
    }, [location.search, openUpdatePassModal])


    const dispatch = useDispatch()
    const { users, oneUser } = useSelector(state => state.users)

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('New Password is required').matches(passwordRegex, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),

        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                if (values.confirmPassword !== values.password) {
                    toast.error('Passwords do not match');
                } else {

                    const response = await dispatch(editUserPassword({ id: decodeUser?.id, newData: { resetToken: userResetToken, newPassword: values.password } }))
                    if (response.payload == undefined) {
                        toast.error('Invalid or expired reset token')
                    } else {
                        toast.success('Password successfully updated')
                        closeUpdatePassModal()
                        formik.resetForm()
                        navigate('/')
                        setShowRegisterPassword(false);
                        setShowConfirmPassword(false);
                        setTimeout(() => {
                            localStorage.removeItem('token')
                        }, 1000)

                    }
                }

            } catch (error) {

                if (error.response && error.response.status === 401) {
                } else {
                    console.error('Error:', error);
                }
            }


        },
    });
    return (
        <div className='resetUpdatePassword' ref={updateRessPass}>
            <div className="passwordUpdateBox">
                <div className="closeBtn" onClick={closeUpdatePassModal}>
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
                                <label htmlFor="registerPasswordUU">New Password</label>
                                <div className='passwordUpdateContainer'>
                                    <input value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} id="registerPasswordUU" type={showRegisterPassword ? 'text' : 'password'} className="form-control" placeholder="New Password" />
                                    <div className="eyeBox" onClick={handleToggleRegisterPassword}>
                                        {showRegisterPassword ? '🙈' : <FaEye />}
                                    </div>

                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.password}</small>
                                ) : null}
                            </div>
                        </div>
                        <div className="passwordUpdateItem">
                            <div className='passwordUpdateItemInside'>
                                <label htmlFor="registerConfirmPasswordUU">Confirm Password</label>
                                <div className='passwordUpdateContainer'>
                                    <input value={formik.values.confirmPassword} name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} id="registerConfirmPasswordUU" type={showConfirmPassword ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" />
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

export default UpdateForgotPassword
