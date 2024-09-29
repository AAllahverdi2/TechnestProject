import React, { useRef, useState } from 'react'
import './Index.scss'
import { FaEye } from 'react-icons/fa'
import { useDataContext } from '../../../context/context';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';

const RegisterForm = () => {
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleToggleRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const { handleCloseRegisterModal, handleOpenLoginModal, registerRef } = useDataContext()

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)

    const [selectedFile, setSelectedFile] = useState(null);
    const fileRef = useRef()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        formik.setFieldValue('profileImage', file);
    };
    const selectFile = (e) => {
        e.preventDefault()
        fileRef.current.click()
    };
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userGmail: '',
            birthdayDay: '',
            birthdayMonth: '',
            birthdayYear: '',
            profileImage: '',
            address: '',
            wishlist: [],
            basket: [],
            winningProduct:[],
            language: '',
            isAdmin: false,
            isLogin: false,
            superAdmin: false,
            isVerified: false,
            status: false,
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            activeBids: 0,
            winningBids: 0,
            bidsInWishlist: 0,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string().required('Phone Number is required'),
            language: Yup.string().required('Language is required'),
            birthdayDay: Yup.string().required('Required'),
            birthdayMonth: Yup.string().required(' Required'),
            birthdayYear: Yup.string().required('Required'),
            userGmail: Yup.string().email('Invalid email address').required('Email is required'),
            profileImage: Yup.mixed().required('Profile Image is required'),
            password: Yup.string().required('Password is required').matches(passwordRegex, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),

        onSubmit: async (values) => {
            const emailExists = users.some(user => user.userGmail === values.userGmail);

            if (emailExists) {
                toast.error('Email already exists. Please use a different email address.');
            } else if (values.confirmPassword !== values.password) {
                toast.error('Passwords do not match');
            } else {

                const formData = new FormData();
                formData.append('profileImage', selectedFile);
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('userGmail', values.userGmail);
                formData.append('birthdayDay', values.birthdayDay);
                formData.append('birthdayMonth', values.birthdayMonth);
                formData.append('birthdayYear', values.birthdayYear);
                formData.append('address', values.address);
                formData.append('language', values.language);
                formData.append('isAdmin', values.isAdmin);
                formData.append('isLogin', values.isLogin);
                formData.append('isVerified', values.isVerified);
                formData.append('status', values.status);
                formData.append('password', values.password);
                formData.append('phoneNumber', values.phoneNumber);
                formData.append('activeBids', values.activeBids);
                formData.append('bidsInWishlist', values.bidsInWishlist);
                formData.append('winningBids', values.winningBids);
                formData.append('superAdmin', values.superAdmin);
                const response = await dispatch(registerUser(formData))
                console.log(response);
                if (response.payload !=undefined){
                    setSelectedFile(null)
                    formik.resetForm()
                    handleCloseRegisterModal()
                    handleOpenLoginModal()
                }
             
            }

        },
    });
    return (
        <div className='registerForm' ref={registerRef}>
            <div className="registerFormBox">
                <div className="closeBtn" onClick={handleCloseRegisterModal}>
                    <IoClose />

                </div>
                <div className="registerFormBoxInside">
                    <div className="registerFormBoxInsideTop">
                        <h4>
                            Create Account
                        </h4>
                        <p>
                            Sign Up to Techbid and Start Learning!
                        </p>
                    </div>
                    <form className="registerFormBoxInsideBottom" onSubmit={formik.handleSubmit}>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="registerFname">
                                    First Name
                                </label>
                                <input value={formik.values.firstName} name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerFname" placeholder="First Name" />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.firstName}</small>
                                ) : null}
                            </div>


                        </div>

                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="registerLname">
                                    Last Name
                                </label>
                                <input value={formik.values.lastName} name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerLname" placeholder="Last Name" />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.lastName}</small>
                                ) : null}        </div>
                        </div>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="registerEmail">
                                    Email Address
                                </label>
                                <input value={formik.values.userGmail} name='userGmail' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerEmail" placeholder="Enter Your Email" />
                                {formik.touched.userGmail && formik.errors.userGmail ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                                ) : null}                 </div>
                        </div>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="profileImage">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    id='profileImage'
                                    ref={fileRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    onBlur={formik.handleBlur}
                                    name='profileImage'
                                />
                                <div className="registerFileInput col-xs-12">
                                    <input
                                        type="text" disabled value={selectedFile ? selectedFile.name : ''} placeholder='Enter Profile Image' />
                                    <span>
                                        <button className='blueBtn' onClick={selectFile}>Upload</button>
                                    </span>

                                </div>
                                {formik.touched.profileImage && formik.errors.profileImage ? (
                                    <small style={{ color: 'red' }} className='testimonialError'>{formik.errors.profileImage}</small>
                                ) : null}
                            </div>
                        </div>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="registerAddress">
                                    Address
                                </label>
                                <input value={formik.values.address} name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="registerAddress" placeholder="Enter Your Address" />
                                {formik.touched.address && formik.errors.address ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.address}</small>
                                ) : null}                      </div>
                        </div>

                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="birthday">
                                    Your Birthday
                                </label>
                                <div className="row row-gap-3">
                                    <div className="col-md-3">
                                        <input value={formik.values.birthdayDay} name='birthdayDay' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" min={1} max={31} id="birthdayDay" placeholder="Day" />
                                        {formik.touched.birthdayDay && formik.errors.birthdayDay ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayDay}</small>
                                        ) : null}
                                    </div>
                                    <div className="col-md-6">
                                        <select
                                            value={formik.values.birthdayMonth}
                                            name="birthdayMonth"
                                            id="birthdayMonth"
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
                                        <input value={formik.values.birthdayYear} min={1940} max={2024} name='birthdayYear' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" id="birthdayYear" placeholder="Year" />
                                        {formik.touched.birthdayYear && formik.errors.birthdayYear ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayYear}</small>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input value={formik.values.phoneNumber} name='phoneNumber' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="phoneNumber" placeholder="Enter Your Phone Number" />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.phoneNumber}</small>
                                ) : null}                       </div>
                        </div>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="language">
                                    Language
                                </label>
                                <select
                                    value={formik.values.language}
                                    name="language"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="language"
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
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="registerPassword">Password</label>
                                <div className='registerFormContainer'>
                                    <input value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} id="registerPassword" type={showRegisterPassword ? 'text' : 'password'} className="form-control" placeholder="Password" />
                                    <div className="eyeBox" onClick={handleToggleRegisterPassword}>
                                        {showRegisterPassword ? '🙈' : <FaEye />}
                                    </div>

                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.password}</small>
                                ) : null}
                            </div>
                        </div>
                        <div className="registerFormItem">
                            <div className='registerFormItemInside'>
                                <label htmlFor="registerConfirmPassword">Confirm Password</label>
                                <div className='registerFormContainer'>
                                    <input value={formik.values.confirmPassword} name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} id="registerConfirmPassword" type={showConfirmPassword ? 'text' : 'password'} className="form-control" placeholder="Password" />
                                    <div className="eyeBox" onClick={handleToggleConfirmPassword}>
                                        {showConfirmPassword ? '🙈' : <FaEye />}
                                    </div>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <small style={{ color: 'red' }} className='registerError'>{formik.errors.confirmPassword}</small>
                                    ) : null}
                                </div>
                            </div>
                        </div>


                        <div className="registerFormItem">
                            <button type='submit' className="registerSignUp">
                                Sign Up
                            </button>
                            <p className='registerFormText text-center mt-2 mb-0 text-white'>
                                Already have an account? <span onClick={() => {
                                    handleCloseRegisterModal()
                                    handleOpenLoginModal()
                                }} >Log in </span> here
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position='top-left' />
        </div>
    )
}

export default RegisterForm
