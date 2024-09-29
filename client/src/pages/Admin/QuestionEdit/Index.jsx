import React, { useEffect } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { postQuestions, updateQuestions } from '../../../redux/slices/questionsSlice';
const QuestionEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { oneQuestion } = useSelector(state => state.questions)
    useEffect(() => {
        formik.setValues({
            questionTitle: oneQuestion?.questionTitle,
            questionContent: oneQuestion?.questionContent,
            questionRating: oneQuestion?.questionRating
        })
    }, [oneQuestion])
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
            dispatch(updateQuestions({ id: oneQuestion?._id, newData: values }))
            formik.resetForm()
            navigate('/admin/questionsTable')
        },

    });
    return (
        <main className='updateQuestions'>
            <Helmet>
                <title>Update Question</title>
            </Helmet>
            <div className="updateQuestionsInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className="updateQuestionsInsideBox">
                                <div className="updateQuestionsInsideBoxInside">
                                    <h4 >Update Question</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="updateQuestionFormItem ">
                                            <label htmlFor="questionTitleU">Question Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.questionTitle}
                                                name='questionTitle'
                                                type="text" id='questionTitleU' placeholder='Enter Question Title' />
                                            {formik.touched.questionTitle && formik.errors.questionTitle ? (
                                                <div className='testimonialError'>{formik.errors.questionTitle}</div>
                                            ) : null}

                                        </div>




                                        <div className="updateQuestionFormItem ">
                                            <label htmlFor="questionRatingU">Question Rating</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.questionRating}
                                                name='questionRating'
                                                id='questionRatingU'
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
                                        <div className="updateQuestionFormItem ">
                                            <label htmlFor="questionDescriptionU">Question Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.questionContent}
                                                name='questionContent' id='questionDescriptionU' placeholder='Enter Question Content' cols="30" rows="10"></textarea>
                                            {formik.touched.questionContent && formik.errors.questionContent ? (
                                                <div className='testimonialError'>{formik.errors.questionContent}</div>
                                            ) : null}
                                        </div>
                                        <div className="questionBtn  ">
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

export default QuestionEdit
