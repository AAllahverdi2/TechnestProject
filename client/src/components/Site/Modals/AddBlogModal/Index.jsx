import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import * as Yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { postBlog } from '../../../../redux/slices/blogSlice';
const AddBlogModal = () => {
    const { blogRef, handleOpenBlog, handleCloseBlog } = useDataContext()

    const dispatch = useDispatch()
    const { users, userToken } = useSelector(state => state.users)
    const [selectedFile, setSelectedFile] = useState(null);
    const fileRef = useRef()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        formik.setFieldValue('blogImage', file);

    };
    const selectFile = (e) => {
        e.preventDefault()
        fileRef.current.click()
    };


    const formik = useFormik({
        initialValues: {
            posterId: '',
            blogTitle: '',
            blogSmallContent: '',
            blogContent: '',
            posterImage: '',
            posterName: '',
            blogTitle2: '',
            blogImage: '',
            watchers: 0,
        },
        validationSchema: Yup.object().shape({
            blogTitle: Yup.string().required('Blog Title is required'),
            blogSmallContent: Yup.string().required('Blog Small Content is required'),
            blogContent: Yup.string()
                .required('Blog Content is required')
                .min(1, 'At least one Blog Content is required'),
            blogImage: Yup.string().required('Blog Image is required'),
        }),


        onSubmit: async (values) => {
            const formData = new FormData();
            const userName = `${userToken?.firstName} ${userToken?.lastName}`

            formData.append('blogContent', values.blogContent);

            formData.append('posterId', userToken?.id);
            formData.append('blogTitle', values.blogTitle);
            formData.append('blogSmallContent', values.blogSmallContent);
            formData.append('posterName', userName);
            formData.append('blogTitle2', values.blogTitle2);
            formData.append('watchers', values.watchers);
            formData.append('blogImage', selectedFile);
            formData.append('posterImage', userToken?.profileImage);


            await dispatch(postBlog(formData))
            toast.success("🚀 Hooray! Your Awesome Blog Has Been Created! Head over to the Blog Page to witness your masterpiece!");
            handleCloseBlog()
            formik.resetForm()
            setSelectedFile(null)
        },
    });



    return (
        <div className='addBlog' ref={blogRef}>
            <div className="addBlogBox">
                <div className="closeBtn" onClick={handleCloseBlog}>
                    <IoClose />

                </div>
                <div className="addBlogBoxInside">
                    <div className="addBlogBoxInsideTop">
                        <h4>
                            Create Blog
                        </h4>

                    </div>
                    <form className="addBlogBoxInsideBottom" onSubmit={formik.handleSubmit}>
                        <div className="addBlogBoxItem">
                            <div className='addBlogBoxItemInside'>
                                <label htmlFor="blogName">Blog Title:</label>
                                <input
                                    type="text"
                                    id="blogName"
                                    name="blogTitle"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.blogTitle}
                                    placeholder='Enter Blog Title'
                                />

                                {formik.touched.blogTitle && formik.errors.blogTitle ? (
                                    <small style={{ color: 'red' }} >{formik.errors.blogTitle}</small>
                                ) : null}
                            </div>
                        </div>
                        <div className="addBlogBoxItem">
                            <div className='addBlogBoxItemInside'>
                                <label htmlFor="blogTitle2">Blog Second Title:</label>
                                <input
                                    type="text"
                                    id="blogTitle2"
                                    name="blogTitle2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.blogTitle2}
                                    placeholder='Enter Blog Second Title'
                                />

                                {formik.touched.blogTitle2 && formik.errors.blogTitle2 ? (
                                    <small style={{ color: 'red' }} >{formik.errors.blogTitle2}</small>
                                ) : null}
                            </div>
                        </div>
                        <div className="addBlogBoxItem">
                            <div className='addBlogBoxItemInside'>
                                <label htmlFor="blogSmallContent">About Blog:</label>
                                <input
                                    type="text"
                                    id="blogSmallContent"
                                    name="blogSmallContent"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.blogSmallContent}
                                    placeholder='Enter About Blog'
                                />

                                {formik.touched.blogSmallContent && formik.errors.blogSmallContent ? (
                                    <small style={{ color: 'red' }} >{formik.errors.blogSmallContent}</small>
                                ) : null}
                            </div>
                        </div>




                        <div className="addBlogBoxItem">
                            <div className='addBlogBoxItemInside'>
                                <label htmlFor="blogImage">
                                    Blog Image
                                </label>
                                <input
                                    type="file"
                                    id='blogImage'
                                    ref={fileRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    onBlur={formik.handleBlur}
                                    name='blogImage'
                                />
                                <div className="addBidFile col-xs-12">
                                    <input
                                        type="text" disabled value={selectedFile ? selectedFile.name : 'No file selected'} placeholder='Select Image' />
                                    <span>
                                        <button className='blueBtn' onClick={selectFile}>Upload</button>
                                    </span>

                                </div>
                                {formik.touched.profileImage && formik.errors.profileImage ? (
                                    <small style={{ color: 'red' }} className='testimonialError'>{formik.errors.profileImage}</small>
                                ) : null}


                            </div>
                        </div>
                        <div className="addBlogBoxItem">
                            <div className='addBlogBoxItemInside'>
                                <label htmlFor="blogContent">Blog Content:</label>
                                <textarea
                                    type="text"
                                    id="blogContent"
                                    name="blogContent"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.blogContent}
                                    placeholder='Enter Blog Content'

                                    cols="20" rows="10"></textarea>
                                {formik.touched.blogContent && formik.errors.blogContent ? (
                                    <small style={{ color: 'red' }} >{formik.errors.blogContent}</small>
                                ) : null}
                            </div>
                        </div>

                        <div className="addBlogBoxItem mt-3">
                            <button type='submit' className="addBidBtn">
                                Create Blog
                            </button>

                        </div>
                    </form>
                </div>
            </div>
            <Toaster position='top-left' />
        </div>
    )
}

export default AddBlogModal
