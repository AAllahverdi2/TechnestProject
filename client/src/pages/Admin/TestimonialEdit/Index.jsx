import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postData, updateData } from '../../../redux/slices/testimonialSlice';
import { useNavigate } from 'react-router-dom'
const TestimonialEdit = () => {
    const { oneData } = useSelector(state => state.testimonial)
    const [selectedFile, setSelectedFile] = useState(null);
    const fileName = oneData?.userImage?.split('-').pop();

    const fileRef = useRef()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            formik.setFieldValue('userImage', file);
        } else {
            formik.setFieldValue('userImage', oneData?.userImage);


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
            testimonialTitle: oneData?.testimonialTitle || '',
            description: oneData?.description || '',
            userImage: fileName || '',
            userProfession: oneData?.userProfession || '',
            userTitle: oneData?.userTitle || '',
            testimonialRating: oneData?.testimonialRating,
        });
    }, [oneData])
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
            console.log(values)
            const formData = new FormData();
            formData.append('testimonialTitle', values.testimonialTitle);
            formData.append('description', values.description);
            if (selectedFile != null) {
                formData.append('userImage', selectedFile);
            } else {
                formData.append('userImage', oneData?.userImage || '');
            }

            formData.append('userProfession', values.userProfession);
            formData.append('userTitle', values.userTitle);
            formData.append('testimonialRating', values.testimonialRating);

            dispatch(updateData({ id: oneData?._id, newData: formData }));
            formik.resetForm()
            setSelectedFile(null)
            navigate('/admin/testimonialsTable')
        },

    });
    return (
        <main className='updateTestimonial ' >

            <Helmet>
                <title>Update Testimonial</title>
            </Helmet>
            <div className="updateTestimonialInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='updateTestimonialCard'>
                                <div className="updateTestimonialCardInside">
                                    <h4 >Update Testimonial</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="updateTestimonialFormItem ">
                                            <label htmlFor="testimonialTitleU">Testimonial Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.testimonialTitle}
                                                name='testimonialTitle'
                                                type="text" id='testimonialTitleU' placeholder='Enter Testimonial Title' />
                                            {formik.touched.testimonialTitle && formik.errors.testimonialTitle ? (
                                                <div className='testimonialError'>{formik.errors.testimonialTitle}</div>
                                            ) : null}

                                        </div>
                                        <div className="updateTestimonialFormItem ">
                                            <label htmlFor="testimonalUserTitleU">User Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.userTitle}
                                                name='userTitle'
                                                type="text" id='testimonalUserTitleU' placeholder='Enter User Title' />
                                            {formik.touched.userTitle && formik.errors.userTitle ? (
                                                <div className='testimonialError'>{formik.errors.userTitle}</div>
                                            ) : null}
                                        </div>
                                        <div className="updateTestimonialFormItem ">
                                            <label htmlFor="testimonalUserImageU">User Image</label>
                                            <input
                                                type="file"
                                                id='testimonalUserImageU'
                                                ref={fileRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                onBlur={formik.handleBlur}
                                                name='userImage'
                                            />
                                            <div className="testimonialFileInp col-xs-12">
                                                <input type="text" disabled value={selectedFile ? selectedFile.name : formik.values.userImage} placeholder='Enter User Image' />
                                                <span>
                                                    <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                                                </span>

                                            </div>
                                            {formik.touched.userImage && formik.errors.userImage ? (
                                                <div className='testimonialError'>{formik.errors.userImage}</div>
                                            ) : null}
                                        </div>

                                        <div className="updateTestimonialFormItem ">
                                            <label htmlFor="testimonalUserProfessionU">User Profession</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.userProfession}
                                                name='userProfession'
                                                type="text" id='testimonalUserProfessionU' placeholder='Enter User Profession' />
                                            {formik.touched.userProfession && formik.errors.userProfession ? (
                                                <div className='testimonialError'>{formik.errors.userProfession}</div>
                                            ) : null}
                                        </div>

                                        <div className="updateTestimonialFormItem ">
                                            <label htmlFor="testimonalRatingU">Testimonial Rating</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.testimonialRating}
                                                name='testimonialRating'
                                                id='testimonalRatingU'
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
                                        <div className="updateTestimonialFormItem ">
                                            <label htmlFor="testimonalDescriptionU">Testimonial Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                                name='description' id='testimonalDescriptionU' placeholder='Enter Testimonial Description' cols="30" rows="10"></textarea>
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className='testimonialError'>{formik.errors.description}</div>
                                            ) : null}
                                        </div>
                                        <div className="updateTestimonialFormBtn  ">
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

export default TestimonialEdit
