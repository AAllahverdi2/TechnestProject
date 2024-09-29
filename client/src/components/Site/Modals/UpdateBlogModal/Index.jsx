import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import * as Yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { updateBlog } from '../../../../redux/slices/blogSlice';
const UpdateBlogModal = () => {
    const { openEditRef, handleOpenBlogEdit, handleCloseBlogEdit } = useDataContext()

    const dispatch = useDispatch()
    const { users, userToken } = useSelector(state => state.users)
    const { oneBlog } = useSelector(state => state.blogs)

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
    useEffect(() => {
        formik.setValues({
            posterId: oneBlog?.posterId,
            blogTitle: oneBlog?.blogTitle,
            blogSmallContent: oneBlog?.blogSmallContent,
            blogContent: oneBlog?.blogContent?.join('\n'),
            posterImage: oneBlog?.posterImage,
            posterName: oneBlog?.posterName,
            blogTitle2: oneBlog?.blogTitle2,
            blogImage: oneBlog?.blogImage,
            watchers: oneBlog?.watchers,
        })
    }, [oneBlog])

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

            formData.append('posterId', values.posterId);
            formData.append('blogTitle', values.blogTitle);
            formData.append('blogSmallContent', values.blogSmallContent);
            formData.append('posterName', values.posterName);
            formData.append('blogTitle2', values.blogTitle2);
            formData.append('watchers', values.watchers);
            formData.append('blogImage', selectedFile);
            formData.append('posterImage', values.posterImage);


            await dispatch(updateBlog({ id: oneBlog?._id, newData: formData }))
            toast.success("🚀 Hooray! Your Awesome Blog Has Been Created! Head over to the Blog Page to witness your masterpiece!");
            handleCloseBlogEdit()
            formik.resetForm()
            setSelectedFile(null)
        },
    });
    return (
        <div className='editBlog' ref={openEditRef}>
            <div className="addBlogBox">
                <div className="closeBtn" onClick={handleCloseBlogEdit}>
                    <IoClose />

                </div>
                <div className="addBlogBoxInside">
                    <div className="addBlogBoxInsideTop">
                        <h4>
                            Update Blog
                        </h4>

                    </div>
                    <form className="addBlogBoxInsideBottom" onSubmit={formik.handleSubmit}>
                        <div className="addBlogBoxItem">
                            <div className='addBlogBoxItemInside'>
                                <label htmlFor="blogNameU">Blog Title:</label>
                                <input
                                    type="text"
                                    id="blogNameU"
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
                                <label htmlFor="blogTitle2U">Blog Second Title:</label>
                                <input
                                    type="text"
                                    id="blogTitle2U"
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
                                <label htmlFor="blogSmallContentU">About Blog:</label>
                                <input
                                    type="text"
                                    id="blogSmallContentU"
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
                                <label htmlFor="blogImageU">
                                    Blog Image
                                </label>
                                <input
                                    type="file"
                                    id='blogImageU'
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
                                <label htmlFor="blogContentU">Blog Content:</label>
                                <textarea
                                    type="text"
                                    id="blogContentU"
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
                                Update Blog
                            </button>

                        </div>
                    </form>
                </div>
            </div>
            <Toaster position='top-left' />
        </div>
    )
}

export default UpdateBlogModal
