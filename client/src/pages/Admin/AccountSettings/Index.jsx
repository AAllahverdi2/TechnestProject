import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { editUser, getOneUser } from '../../../redux/slices/userSlice';
import AdminImageUpdateModal from '../../../components/Admin/AdminImageUpdateModal/Index';
import { useDataContext } from '../../../context/context';
const AccountSettings = () => {
    const { oneUser, userToken, users } = useSelector(state => state.users)
    const { handleOpen } = useDataContext()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getOneUser(id))
    }, [])

    useEffect(() => {
        formik.setValues({
            firstName: oneUser?.firstName,
            lastName: oneUser?.lastName,
            userGmail: oneUser?.userGmail,
            birthdayDay: oneUser?.birthdayDay,
            birthdayMonth: oneUser?.birthdayMonth,
            birthdayYear: oneUser?.birthdayYear,
            profileImage: oneUser?.profileImage || '',
            address: oneUser?.address,
            wishlist: oneUser?.wishlist || [],
            basket: oneUser?.basket || [],
            language: oneUser?.language,
            isAdmin: oneUser?.isAdmin,
            isLogin: oneUser?.isLogin,
            superAdmin: oneUser?.superAdmin,
            isVerified: oneUser?.isVerified,
            status: oneUser?.status,
            phoneNumber: oneUser?.phoneNumber,
            activeBids: oneUser?.activeBids,
            winningBids: oneUser?.winningBids,
            bidsInWishlist: oneUser?.bidsInWishlist,
        })
    }, [])
    const fileRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()
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
            language: '',
            isAdmin: false,
            isLogin: false,
            superAdmin: false,
            isVerified: false,
            status: false,
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
        }),

        onSubmit: async (values) => {

            const formData = new FormData();
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
            formData.append('phoneNumber', values.phoneNumber);
            formData.append('activeBids', values.activeBids);
            formData.append('bidsInWishlist', values.bidsInWishlist);
            formData.append('winningBids', values.winningBids);
            formData.append('superAdmin', values.superAdmin);
            await dispatch(editUser({ id: oneUser?._id, newData: formData }))
            toast.success('Your Account Settings Successfully Updated')

            navigate('/admin/dashboard');


        },

    });
    return (
        <main className='accountSetting ' >

            <Helmet>
                <title>Account Setting</title>
            </Helmet>
            <div className="accountSettingInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-12">
                            <div className='accountSettingCard'>
                                <div className="accountSettingCardInside">
                                    <h4 >Account Settings</h4>

                                    <div className="text-center w-100 my-4 userImageBox">
                                        <div onClick={handleOpen} style={{cursor:'pointer'}} className="userImageBoxInside">
                                            <img src={`http://localhost:5050/public/${oneUser?.profileImage}`} alt="" />
                                        </div>
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="accountSettingItem">
                                            <label htmlFor="accFirstName">
                                                First Name *
                                            </label>
                                            <input value={formik.values.firstName} name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="accFirstName" />
                                            {formik.touched.firstName && formik.errors.firstName ? (
                                                <small style={{ color: 'red' }} className='registerError'>{formik.errors.firstName}</small>
                                            ) : null}
                                        </div>


                                        <div className="accountSettingItem">
                                            <label htmlFor="accLastName">
                                                Last Name *
                                            </label>
                                            <input value={formik.values.lastName} name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="accLastName" />
                                            {formik.touched.lastName && formik.errors.lastName ? (
                                                <small style={{ color: 'red' }} className='registerError'>{formik.errors.lastName}</small>
                                            ) : null}
                                        </div>
                                        <div className="accountSettingItem">
                                            <label htmlFor="accLastGmail">Email Address *</label>
                                            <input type="text" id='accLastGmail' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userGmail} name='userGmail' />
                                            {formik.touched.userGmail && formik.errors.userGmail ? (
                                                <small style={{ color: 'red' }} className='registerError'>{formik.errors.userGmail}</small>
                                            ) : null}
                                        </div>

                                        <div className="accountSettingItem">
                                            <label htmlFor="accAddress">
                                                Address *
                                            </label>
                                            <input value={formik.values.address} name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="accAddress" />
                                            {formik.touched.address && formik.errors.address ? (
                                                <small style={{ color: 'red' }} className='registerError'>{formik.errors.address}</small>
                                            ) : null}
                                        </div>

                                        <div className="accountSettingItem">
                                            <label htmlFor="accBirth">
                                                Your Birthday *
                                            </label>
                                            <div className="row w-100 row-gap-3">
                                                <div className="col-md-3">
                                                    <input value={formik.values.birthdayDay} name='birthdayDay' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" min={1} max={31} id="accBirthdayDay" placeholder="Day" />
                                                    {formik.touched.birthdayDay && formik.errors.birthdayDay ? (
                                                        <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayDay}</small>
                                                    ) : null}
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        value={formik.values.birthdayMonth}
                                                        name="birthdayMonth"
                                                        id="accBirthdayMonth"
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
                                                    <input value={formik.values.birthdayYear} min={1940} max={2024} name='birthdayYear' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" id="accBirthdayYear" placeholder="Year" />
                                                    {formik.touched.birthdayYear && formik.errors.birthdayYear ? (
                                                        <small style={{ color: 'red' }} className='registerError'>{formik.errors.birthdayYear}</small>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accountSettingItem">
                                            <label htmlFor="accNumber">
                                                Phone Number *
                                            </label>
                                            <input value={formik.values.phoneNumber} name='phoneNumber' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="accNumber" />
                                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                                <small style={{ color: 'red' }} className='registerError'>{formik.errors.phoneNumber}</small>
                                            ) : null}
                                        </div>


                                        <div className="accountSettingItem">
                                            <label htmlFor="accLanguage">
                                                Language *
                                            </label>
                                            <select
                                                value={formik.values.language}
                                                name="language"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id="accLanguage"
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


                                        <div className="text-center">
                                            <button type="submit" className=" btn btn-outline-warning w-100  accountSettingBtn ">Update</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AdminImageUpdateModal />
        </main>
    )
}

export default AccountSettings
