import React, { useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { postQuestions } from '../../../redux/slices/questionsSlice';
const AddQuestions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            questionTitle: '',
            questionContent: '',
            questionRating: 5
        },
        validationSchema: Yup.object({
            questionTitle: Yup.string()
                .required('Question Title Is Required'),
            questionRating: Yup.number()
                .required('Question Rating Is Required'),
            questionContent: Yup.string()
                .required('Question Content Is Required'),
        }),
        onSubmit: async (values) => {
            dispatch(postQuestions(values))
            formik.resetForm()
            navigate('/admin/questionsTable')
        },

    });

    return (
        <main className='addQuestions'>
            <Helmet>
                <title>Add Question</title>
            </Helmet>
            <div className="addQuestionsInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className="addQuestionsInsideBox">
                                <div className="addQuestionsInsideBoxInside">
                                    <h4 >Add Question</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addQuestionFormItem ">
                                            <label htmlFor="questionTitle">Question Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.questionTitle}
                                                name='questionTitle'
                                                type="text" id='questionTitle' placeholder='Enter Question Title' />
                                            {formik.touched.questionTitle && formik.errors.questionTitle ? (
                                                <div className='testimonialError'>{formik.errors.questionTitle}</div>
                                            ) : null}

                                        </div>




                                        <div className="addQuestionFormItem ">
                                            <label htmlFor="questionRating">Question Rating</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.questionRating}
                                                name='questionRating'
                                                id='questionRating'
                                                placeholder='Enter Testimonial Rating'
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                            {formik.touched.questionRating && formik.errors.questionRating ? (
                                                <div className='testimonialError'>{formik.errors.questionRating}</div>
                                            ) : null}
                                        </div>
                                        <div className="addQuestionFormItem ">
                                            <label htmlFor="questionDescription">Question Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.questionContent}
                                                name='questionContent' id='questionDescription' placeholder='Enter Question Content' cols="30" rows="10"></textarea>
                                            {formik.touched.questionContent && formik.errors.questionContent ? (
                                                <div className='testimonialError'>{formik.errors.questionContent}</div>
                                            ) : null}
                                        </div>
                                        <div className="questionBtn  ">
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

export default AddQuestions
