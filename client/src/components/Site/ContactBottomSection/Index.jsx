import React, { useRef } from 'react'
import './Index.scss'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
const ContactBottomSection = () => {
    const submitRef = useRef()
    const { t } = useTranslation()
    const formik = useFormik({
        initialValues: {
            contactName: '',
            contactEmail: '',
            contactContent: '',
        },
        validationSchema: Yup.object({
            contactName: Yup.string()
                .required(t('pages.contactUs.contactBottomSection.contactRight.err1')),
            contactContent: Yup.string()
                .required(t('pages.contactUs.contactBottomSection.contactRight.err2')),
            contactEmail: Yup.string().email(t('pages.contactUs.contactBottomSection.contactRight.err4')).required(t('pages.contactUs.contactBottomSection.contactRight.err3')),
        }),
        onSubmit: async (values) => {
            await axios.post('http://localhost:5050/sendEmail', values).then((res) => {
                if (res.status == 200) {
                    submitRef.current.classList.replace('d-none', 'd-flex')
                    formik.resetForm()
                    setTimeout(() => {
                        submitRef.current.classList.replace('d-flex', 'd-none')

                    }, 2000)
                } else if (res.status == 500) {
                    toast.error(t('pages.contactUs.contactBottomSection.contactRight.somethingWrongMessage'))
                }
            })


        },
    });
    return (
        <section className='contactBottomSection'>
            <div className="container">
                <div className="contactBottomSectionTop wow animate__animated animate__fadeInDown">
                    <h2>
                        {
                            t('pages.contactUs.contactBottomSection.contactTop.h2')
                        }
                    </h2>
                    <p>
                        {
                            t('pages.contactUs.contactBottomSection.contactTop.p')
                        }
                    </p>
                </div>

                <div className='row justify-content-between align-items-center'>
                    <div className='col-lg-4 wow  animate__animated animate__fadeInUp' data-wow-delay="0.2s">
                        <div className="contactBottomLeft">
                            <div className="contactBottomLeftTop">
                                <h3>
                                    {
                                        t('pages.contactUs.contactBottomSection.contactLeft.h3')
                                    }
                                </h3>
                                <p>
                                    {
                                        t('pages.contactUs.contactBottomSection.contactLeft.p')
                                    }
                                </p>
                            </div>
                            <ul className="contactBottomLeftMiddle">
                                <li>
                                    <div className="contactIcon">
                                        <FaEnvelope />
                                    </div>
                                    <a href="#">tu7c1ne72@code.edu.az</a>
                                </li>
                                <li>
                                    <div className="contactIcon">
                                        <FaPhoneAlt />
                                    </div>
                                    <a href="#">+994506627323</a>
                                </li>
                            </ul>
                            <div className="contactBottomLeftBottom">
                                <h5>
                                    {
                                        t('pages.contactUs.contactBottomSection.contactLeft.h5')
                                    }
                                </h5>
                                <ul className="contactSocial">
                                    <li><a href="#"><FaFacebook /></a></li>
                                    <li><a href="#"><FaTwitter /></a></li>
                                    <li><a href="#"><FaInstagram /></a></li>
                                    <li><a href="#"><FaLinkedin />
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 wow animate__animated animate__fadeInRight" data-wow-delay="0.3s">
                        <div className="contactBottomRight">
                            <form action="#" onSubmit={formik.handleSubmit} className='contactForm'>
                                <div className='row g-3'>
                                    <div className="col-lg-6">
                                        <div className="form-control formBoxInContact">
                                            <label htmlFor="Name">
                                                {
                                                    t('pages.contactUs.contactBottomSection.contactRight.label1')
                                                }
                                            </label>
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.contactName} name='contactName' type="text" id="Name" placeholder={t('pages.contactUs.contactBottomSection.contactRight.input1')} />
                                            {formik.touched.contactName && formik.errors.contactName ? (
                                                <small>{formik.errors.contactName}</small>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-control formBoxInContact">
                                            <label htmlFor="mail">
                                                {
                                                    t('pages.contactUs.contactBottomSection.contactRight.label2')
                                                }
                                            </label>
                                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.contactEmail} name='contactEmail' type="text" id="mail" placeholder={t('pages.contactUs.contactBottomSection.contactRight.input2')} />
                                            {formik.touched.contactEmail && formik.errors.contactEmail ? (
                                                <small>{formik.errors.contactEmail}</small>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-control formBoxInContact">
                                            <label htmlFor="message">
                                                {
                                                    t('pages.contactUs.contactBottomSection.contactRight.label3')
                                                }
                                            </label>
                                            <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.contactContent} name='contactContent' id="message" cols="10" rows="5" placeholder={t('pages.contactUs.contactBottomSection.contactRight.input3')}></textarea>
                                            {formik.touched.contactContent && formik.errors.contactContent ? (
                                                <small>{formik.errors.contactContent}</small>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className='contactBtn'>
                                    {
                                        t('pages.contactUs.contactBottomSection.contactRight.btn')
                                    }
                                </button>
                                <div className="successMessage">

                                    <p className='d-none' ref={submitRef}>

                                        {
                                            t('pages.contactUs.contactBottomSection.contactRight.successMessage')
                                        }</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactBottomSection
