import React, { useRef } from 'react'
import './Index.scss'
import poct from '../../../assets/poct.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { postSubscribers } from '../../../redux/slices/subscribersSlice';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
const SubscribeSection = () => {
    const location = useLocation()
    const { subscribers } = useSelector(state => state.subscribers)
    const submitRef = useRef()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const subscribeRef = useRef(null)
    const formik = useFormik({
        initialValues: {
            subscriberGmail: '',
        },
        validationSchema: Yup.object({
            subscriberGmail: Yup.string().email(t('pages.home.subscriberSection.errorMessage1')),
        }),
        onSubmit: async (values) => {
            const emailExists = subscribers.some(user => user.subscriberGmail === values.subscriberGmail);
            if (emailExists) {
                toast.error(t('pages.home.subscriberSection.errorMessage2'), {
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
        <section className='subscribeSection' style={{ display: location.pathname == '/*' ? "none " : "" }}>
            <div className="container">
                <div className="subscribeSectionInside">
                    <div className="subscribeSectionInsideLeft">
                        <img src={poct} alt="poct" />
                    </div>
                    <div className="subscribeSectionInsideRight">
                        <h4>
                            {
                                t('pages.home.subscriberSection.h4')
                            }
                        </h4>
                        <form action="tu7c1ne72@code.edu.az" method='post' onSubmit={formik.handleSubmit}>
                            <div className="formInput">
                                <input ref={subscribeRef} type="email"
                                    placeholder={t('pages.home.subscriberSection.input')}
                                    value={formik.values.subscriberGmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} name='subscriberGmail' />

                            </div>
                            <button disabled={!subscribeRef.current?.value} className='footBtn' type='submit'>
                                {
                                    t('pages.home.subscriberSection.button')
                                }
                            </button>


                        </form>
                        {formik.touched.subscriberGmail && formik.errors.subscriberGmail ? (
                            <small style={{ color: 'red' }}>{formik.errors.subscriberGmail}</small>
                        ) : null}
                        <p className='d-none text-success' ref={submitRef}>
                            {
                                t('pages.home.subscriberSection.successMessage')
                            }
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubscribeSection
