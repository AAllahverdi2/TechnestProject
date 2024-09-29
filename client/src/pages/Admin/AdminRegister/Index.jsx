import React, { useRef, useState } from 'react'
import './Index.scss'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router';

const AdminRegister = () => {
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleToggleRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

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
    const navigate = useNavigate()
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
            isAdmin: true,
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
                if (response.payload != undefined) {
                    setSelectedFile(null)
                    formik.resetForm()
                    navigate('/admin/loginAdmin')
                }

            }

        },
    });
    return (
        <main className='adminRegister'>
            <div className="adminRegisterInside">
                <div className='row w-100 m-0'>
                    <div className="adminRegisterInsideBox d-flex align-items-center">
                        <div className='adminRegisterCard col-lg-5 mx-auto'>
                            <div className="adminRegisterCardInside">
                                <h3 className="adminRegisterTitle text-left mb-3">
                                    Register
                                </h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegF">
                                            First Name *
                                        </label>
                                        <input value={formik.values.firstName} name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="adminRegF" />
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.firstName}</small>
                                        ) : null}
                                    </div>


                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegisterN">
                                            Last Name *
                                        </label>
                                        <input value={formik.values.lastName} name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="adminRegisterN" />
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.lastName}</small>
                                        ) : null}
                                    </div>
                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegGm">Email Address *</label>
                                        <input type="text" id='adminRegGm' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userGmail} name='userGmail' />
                                        {formik.touched.userGmail && formik.errors.userGmail ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                                        ) : null}
                                    </div>

                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegIm">Profile Image *</label>
                                        <input
                                            type="file"
                                            id='adminRegIm'
                                            ref={fileRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            onBlur={formik.handleBlur}
                                            name='profileImage'
                                        />
                                        <div className="adminRegFileInp col-xs-12">
                                            <input
                                                type="text" disabled value={selectedFile ? selectedFile.name : ''} />
                                            <span>
                                                <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                                            </span>

                                        </div>
                                        {formik.touched.userImage && formik.errors.userImage ? (
                                            <div className='testimonialError'>{formik.errors.userImage}</div>
                                        ) : null}

                                    </div>
                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegAddress">
                                            Address *
                                        </label>
                                        <input value={formik.values.address} name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="adminRegAddress" />
                                        {formik.touched.address && formik.errors.address ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.address}</small>
                                        ) : null}
                                    </div>

                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegBirt">
                                            Your Birthday *
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

                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminNumberRef">
                                            Phone Number *
                                        </label>
                                        <input value={formik.values.phoneNumber} name='phoneNumber' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="adminNumberRef" />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                            <small style={{ color: 'red' }} className='registerError'>{formik.errors.phoneNumber}</small>
                                        ) : null}
                                    </div>


                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegLanguage">
                                            Language *
                                        </label>
                                        <select
                                            value={formik.values.language}
                                            name="language"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            id="adminRegLanguage"
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
                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegPass">Password *</label>
                                        <div className="password-input">
                                            <input
                                                type={showRegisterPassword ? 'text' : 'password'}
                                                id="adminRegPass"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                name="password"
                                            />
                                            <span className="password-toggle" onClick={handleToggleRegisterPassword}>
                                                {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        {formik.touched.password && formik.errors.password ? (
                                            <small style={{ color: 'red' }} className="registerError">
                                                {formik.errors.password}
                                            </small>
                                        ) : null}
                                    </div>

                                    <div className="adminRegisterGroup">
                                        <label htmlFor="adminRegConfirmPass">Confirm Password *</label>
                                        <div className="password-input">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="adminRegConfirmPass"
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
                                    <div className="text-center">
                                        <button type="submit" className=" adminLoginSubmit ">Sign Up</button>

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

export default AdminRegister

