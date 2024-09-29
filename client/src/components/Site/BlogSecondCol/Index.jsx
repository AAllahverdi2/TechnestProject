import React, { useEffect, useRef, useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import roket from '../../../assets/roket.png'
import './Index.scss'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import arrayShuffle from 'array-shuffle';
import { getOneBlog, updateBlogWatchers } from '../../../redux/slices/blogSlice'
import { useFormik } from 'formik'
import { postSubscribers } from '../../../redux/slices/subscribersSlice';
import toast from 'react-hot-toast';
import { getAllBlogsComment } from '../../../redux/slices/commentSlice';
import { useTranslation } from 'react-i18next';

const BlogSecondCol = () => {
    const dispatch = useDispatch()
    const { blogs } = useSelector(state => state.blogs)
    const [randomBlogs, setRandomBlogs] = useState([]);

    useEffect(() => {
        const shuffledBlogs = arrayShuffle(blogs);
        const selectedBlogs = shuffledBlogs.slice(0, 4);


        setRandomBlogs(selectedBlogs);
    }, [blogs]);
    const { subscribers } = useSelector(state => state.subscribers)
    const submitRef = useRef()
    const { t } = useTranslation()
    const formik = useFormik({
        initialValues: {
            subscriberGmail: '',
        },
        validationSchema: Yup.object({
            subscriberGmail: Yup.string().email(t('pages.blog.blogSecondCol.emailErr')),
        }),
        onSubmit: async (values) => {
            const emailExists = subscribers.some(user => user.subscriberGmail === values.subscriberGmail);
            if (emailExists) {
                toast.error(t('pages.blog.blogSecondCol.emailErr2'), {
                    position: 'bottom-left'
                });
            } else {
                const response = await dispatch(postSubscribers(values))
                if (response.payload !== undefined) {
                    submitRef.current.classList.replace('d-none', 'd-flex')
                    formik.resetForm()
                    setTimeout(() => {
                        submitRef.current.classList.replace('d-flex', 'd-none')

                    }, 2000)
                }


            }
        }
    });
    return (
        <div className="blogSecondCol">
            <div className="blogSecondColItem">
                <div className="blogSubscribe">
                    <h4>

                        {
                            t('pages.blog.blogSecondCol.h4')

                        }
                    </h4>
                    <form onSubmit={formik.handleSubmit}>
                        <input type="text" placeholder={t('pages.blog.blogSecondCol.placeholder')}
                            value={formik.values.subscriberGmail} onChange={formik.handleChange}
                            onBlur={formik.handleBlur} name='subscriberGmail' />
                        <button type='submit' className="formIcon">
                            <img src={roket} alt="roket" />
                        </button>
                        {formik.touched.subscriberGmail && formik.errors.subscriberGmail ? (
                            <small style={{ color: 'red' }}>{formik.errors.subscriberGmail}</small>
                        ) : null}
                        <p className='d-none text-success' ref={submitRef}>
                            {
                                t('pages.blog.blogSecondCol.successMessage')

                            }
                        </p>
                    </form>
                </div>
            </div>

            <div className="blogSecondColItem">
                <div className="featureBox">
                    <h4>

                        {
                            t('pages.blog.blogSecondCol.title2')

                        }

                    </h4>
                    <ul className="featureBoxList">
                        {
                            randomBlogs?.map((item, index) => {
                                return <li key={index}>
                                    <div className="featureBoxListImage">
                                        <img src={`http://localhost:5050/public/${item.blogImage}`} alt="" />
                                    </div>
                                    <p>
                                        <Link to={`/blog/${item._id}`} onClick={async () => {
                                            await dispatch(updateBlogWatchers(item._id))
                                            await dispatch(getOneBlog(item._id))
                                            await dispatch(getAllBlogsComment(item._id))

                                            window.scroll({
                                                top: 0,
                                                left: 0,
                                                behavior: 'smooth'
                                            });
                                        }}>

                                            {item.blogTitle2}
                                        </Link>
                                    </p>
                                </li>
                            })
                        }

                    </ul>
                </div>
            </div>

            <div className="blogSecondColItem">
                <div className="followBox">
                    <h4>
                        {
                            t('pages.blog.blogSecondCol.title3')

                        }

                    </h4>

                    <ul className="socials">
                        <li>
                            <a href="#"><FaFacebookF /></a>
                        </li>

                        <li>
                            <a href="#"><FaInstagram /></a>
                        </li>


                        <li>
                            <a href="#"><FaTwitter /></a>
                        </li>

                        <li>
                            <a href="#"><FaLinkedinIn /></a>
                        </li>


                        <li>
                            <a href="#"><FaYoutube /></a>
                        </li>


                        <li>
                            <a href="#"><FaTwitch /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BlogSecondCol
