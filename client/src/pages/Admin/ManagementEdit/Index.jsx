import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../redux/slices/testimonialSlice';
import { useNavigate } from 'react-router-dom'
import { postManagement, updateManagement } from '../../../redux/slices/managementSlice';
const ManagementEdit = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { oneManagement } = useSelector(state => state.management)
    const fileName = oneManagement?.managementImage?.split('-').pop();

    const fileRef = useRef()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            formik.setFieldValue('managementImage', file);
        } else {
            formik.setFieldValue('managementImage', oneManagement?.managementImage);

        }
    };
    const selectFile = (e) => {
        e.preventDefault()
        fileRef.current.click()
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        formik.setValues({
            managementTitle: oneManagement?.managementTitle,
            managementImage: fileName,
            managementProfession: oneManagement?.managementProfession,
            managementContent: oneManagement?.managementContent,
            managementInstagram: oneManagement?.managementInstagram,
            managementTwitter: oneManagement?.managementTwitter,
            managementFacebook: oneManagement?.managementFacebook,
            managementLinkedin: oneManagement?.managementLinkedin,
        })
    }, [oneManagement])
    const formik = useFormik({
        initialValues: {
            managementImage: '',
            managementTitle: '',
            managementProfession: '',
            managementContent: '',
            managementInstagram: '',
            managementTwitter: '',
            managementFacebook: '',
            managementLinkedin: '',
        },
        validationSchema: Yup.object({
            managementProfession: Yup.string()
                .required('Management Profession Is Required'),
            managementTitle: Yup.string()
                .required('Management Title Required'),
            managementImage: Yup.mixed().required('Management Image Is Required'),
            managementContent: Yup.string()
                .required('Management Content Is Required'),

        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('managementProfession', values.managementProfession);
            formData.append('managementTitle', values.managementTitle);
            if (selectedFile) {
                formData.append('managementImage', selectedFile);
            } else {
                formData.append('managementImage', oneManagement?.managementImage);

            }
            formData.append('managementContent', values.managementContent);
            formData.append('managementInstagram', values.managementInstagram);
            formData.append('managementTwitter', values.managementTwitter);
            formData.append('managementFacebook', values.managementFacebook);
            formData.append('managementLinkedin', values.managementLinkedin);

            dispatch(updateManagement({ id: oneManagement?._id, newData: formData }));
            formik.resetForm()
            setSelectedFile(null)
            navigate('/admin/managementTable')
        },

    });

    return (
        <main className='updateManagement ' >

            <Helmet>
                <title>Update Management</title>
            </Helmet>
            <div className="updateManagementInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='updateManagementInsideCard'>
                                <div className="updateManagementInsideCardBox">
                                    <h4 >Update Management</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementTitleU">Management Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementTitle}
                                                name='managementTitle'
                                                type="text" id='managementTitleU' placeholder='Enter Management Title' />
                                            {formik.touched.managementTitle && formik.errors.managementTitle ? (
                                                <div className='testimonialError'>{formik.errors.managementTitle}</div>
                                            ) : null}

                                        </div>

                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementImageU">Management Image</label>
                                            <input
                                                type="file"
                                                id='managementImageU'
                                                ref={fileRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                onBlur={formik.handleBlur}
                                                name='managementImage'
                                            />
                                            <div className="managementFileInput col-xs-12">
                                                <input
                                                    type="text" disabled value={selectedFile ? selectedFile.name : formik.values.managementImage} placeholder='Enter Management Image' />
                                                <span>
                                                    <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                                                </span>

                                            </div>
                                            {formik.touched.managementImage && formik.errors.managementImage ? (
                                                <div className='testimonialError'>{formik.errors.managementImage}</div>
                                            ) : null}
                                        </div>

                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementProfessionU">Management Profession</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementProfession}
                                                name='managementProfession'
                                                type="text" id='managementProfessionU' placeholder='Enter Management Profession' />
                                            {formik.touched.managementProfession && formik.errors.managementProfession ? (
                                                <div className='testimonialError'>{formik.errors.managementProfession}</div>
                                            ) : null}
                                        </div>
                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementInstagramU">Management Instagram</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementInstagram}
                                                name='managementInstagram'
                                                type="text" id='managementInstagramU' placeholder='Enter Management Instagram' />

                                        </div>
                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementTwitterU">Management Twitter</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementTwitter}
                                                name='managementTwitter'
                                                type="text" id='managementTwitterU' placeholder='Enter Management Twitter' />

                                        </div>
                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementFacebookU">Management Facebook</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementFacebook}
                                                name='managementFacebook'
                                                type="text" id='managementFacebookU' placeholder='Enter Management Facebook' />

                                        </div>
                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementLinkedinU">Management Linkedin</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementLinkedin}
                                                name='managementLinkedin'
                                                type="text" id='managementLinkedinU' placeholder='Enter Management Linkedin' />

                                        </div>
                                        <div className="updateManagementFormItem ">
                                            <label htmlFor="managementContentU">Management Content</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.managementContent}
                                                name='managementContent' id='managementContentU' placeholder='Enter Management Content' cols="30" rows="10"></textarea>
                                            {formik.touched.managementContent && formik.errors.managementContent ? (
                                                <div className='testimonialError'>{formik.errors.managementContent}</div>
                                            ) : null}
                                        </div>
                                        <div className="managementFormBtn  ">
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

export default ManagementEdit
