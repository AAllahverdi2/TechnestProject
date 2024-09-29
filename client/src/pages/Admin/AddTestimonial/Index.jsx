import React, { useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../redux/slices/testimonialSlice';
import { useNavigate } from 'react-router-dom'
const AddTestimonial = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { testimonial } = useSelector(state => state.testimonial)

    const fileRef = useRef()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        formik.setFieldValue('userImage', file);
    };
    const selectFile = (e) => {
        e.preventDefault()
        fileRef.current.click()
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            testimonialTitle: '',
            description: '',
            userImage: '',
            userProfession: '',
            userTitle: '',
            testimonialRating: 5
        },
        validationSchema: Yup.object({
            testimonialTitle: Yup.string()
                .required('Testimonial Title Is Required'),
            userTitle: Yup.string()
                .required('User Title Required'),
            userImage: Yup.mixed().required('User Image Is Required'),
            userProfession: Yup.string()
                .required('User Profession Is Required'),
            testimonialRating: Yup.number()
                .required('Testimonial Rating Is Required'),
            description: Yup.string()
                .required('Description Is Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('testimonialTitle', values.testimonialTitle);
            formData.append('description', values.description);
            formData.append('userImage', selectedFile);
            formData.append('userProfession', values.userProfession);
            formData.append('userTitle', values.userTitle);
            formData.append('testimonialRating', values.testimonialRating);

            dispatch(postData(formData));
            formik.resetForm()
            setSelectedFile(null)
            navigate('/admin/testimonialsTable')
        },

    });


    return (
        <main className='addTestimonial ' >

            <Helmet>
                <title>Add Testimonial</title>
            </Helmet>
            <div className="addTestimonialInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addTestimonialCard'>
                                <div className="addTestimonialCardInside">
                                    <h4 >Add Testimonial</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addTestimonialFormItem ">
                                            <label htmlFor="testimonialTitle">Testimonial Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.testimonialTitle}
                                                name='testimonialTitle'
                                                type="text" id='testimonialTitle' placeholder='Enter Testimonial Title' />
                                            {formik.touched.testimonialTitle && formik.errors.testimonialTitle ? (
                                                <div className='testimonialError'>{formik.errors.testimonialTitle}</div>
                                            ) : null}

                                        </div>
                                        <div className="addTestimonialFormItem ">
                                            <label htmlFor="testimonalUserTitle">User Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.userTitle}
                                                name='userTitle'
                                                type="text" id='testimonalUserTitle' placeholder='Enter User Title' />
                                            {formik.touched.userTitle && formik.errors.userTitle ? (
                                                <div className='testimonialError'>{formik.errors.userTitle}</div>
                                            ) : null}
                                        </div>
                                        <div className="addTestimonialFormItem ">
                                            <label htmlFor="testimonalUserImage">User Image</label>
                                            <input
                                                type="file"
                                                id='testimonalUserImage'
                                                ref={fileRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                onBlur={formik.handleBlur}
                                                name='userImage'
                                            />
                                            <div className="testimonialFileInp col-xs-12">
                                                <input
                                                    type="text" disabled value={selectedFile ? selectedFile.name : ''} placeholder='Enter User Image' />
                                                <span>
                                                    <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                                                </span>

                                            </div>
                                            {formik.touched.userImage && formik.errors.userImage ? (
                                                <div className='testimonialError'>{formik.errors.userImage}</div>
                                            ) : null}
                                        </div>

                                        <div className="addTestimonialFormItem ">
                                            <label htmlFor="testimonalUserProfession">User Profession</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.userProfession}
                                                name='userProfession'
                                                type="text" id='testimonalUserProfession' placeholder='Enter User Profession' />
                                            {formik.touched.userProfession && formik.errors.userProfession ? (
                                                <div className='testimonialError'>{formik.errors.userProfession}</div>
                                            ) : null}
                                        </div>

                                        <div className="addTestimonialFormItem ">
                                            <label htmlFor="testimonalRating">Testimonial Rating</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.testimonialRating}
                                                name='testimonialRating'
                                                id='testimonalRating'
                                                placeholder='Enter Testimonial Rating'
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                            {formik.touched.testimonialRating && formik.errors.testimonialRating ? (
                                                <div className='testimonialError'>{formik.errors.testimonialRating}</div>
                                            ) : null}
                                        </div>
                                        <div className="addTestimonialFormItem ">
                                            <label htmlFor="testimonalDescription">Testimonial Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                                name='description' id='testimonalDescription' placeholder='Enter Testimonial Description' cols="30" rows="10"></textarea>
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className='testimonialError'>{formik.errors.description}</div>
                                            ) : null}
                                        </div>
                                        <div className="addTestimonialFormBtn  ">
                                            <button type='submit ' className='btn btn-outline-success  w-100'>
                                                Submit
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

export default AddTestimonial
