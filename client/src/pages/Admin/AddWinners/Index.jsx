import React, { useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { postWinner } from '../../../redux/slices/winnersSlice';
const AddWinners = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { winners } = useSelector(state => state.winners)

    const fileRef = useRef()
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        formik.setFieldValue('winnerImage', file);
    };
    const selectFile = (e) => {
        e.preventDefault()
        fileRef.current.click()
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            winnerTitle: '',
            winnerRating: 5,
            winnerImage: '',
        },
        validationSchema: Yup.object({
            winnerTitle: Yup.string()
                .required('Winner Title Is Required'),
            winnerRating: Yup.number()
                .required('Winner Rating Is Required'),
            winnerImage: Yup.mixed().required('Winner Image Is Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('winnerTitle', values.winnerTitle);
            formData.append('winnerRating', values.winnerRating);
            formData.append('winnerImage', selectedFile);

            dispatch(postWinner(formData));
            formik.resetForm()
            setSelectedFile(null)
            navigate('/admin/winnersTable')
        },

    });

    return (
        <main className='addWinner ' >

            <Helmet>
                <title>Add Winner</title>
            </Helmet>
            <div className="addWinnerInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addWinnerInsideCard'>
                                <div className="addWinnerInsideCardBox">
                                    <h4 >Add Winner</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addWinnerFormItem ">
                                            <label htmlFor="winnerTitle">Winner Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.winnerTitle}
                                                name='winnerTitle'
                                                type="text" id='winnerTitle' placeholder='Enter Winner Title' />
                                            {formik.touched.winnerTitle && formik.errors.winnerTitle ? (
                                                <div className='testimonialError'>{formik.errors.winnerTitle}</div>
                                            ) : null}

                                        </div>
                                        <div className="addWinnerFormItem ">
                                            <label htmlFor="winnerImage">Winner Image</label>
                                            <input
                                                type="file"
                                                id='winnerImage'
                                                ref={fileRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                onBlur={formik.handleBlur}
                                                name='winnerImage'
                                            />
                                            <div className="winnerFileInput col-xs-12">
                                                <input
                                                    type="text" disabled value={selectedFile ? selectedFile.name : ''} placeholder='Enter Winner Image' />

                                                <span>
                                                    <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                                                </span>

                                            </div>
                                            {formik.touched.winnerImage && formik.errors.winnerImage ? (
                                                <div className='testimonialError'>{formik.errors.winnerImage}</div>
                                            ) : null}
                                        </div>

                                        <div className="addWinnerFormItem ">
                                            <label htmlFor="winnerRating">Winner Rating</label>
                                            <select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.winnerRating}
                                                name='winnerRating'
                                                id='winnerRating'
                                                placeholder='Enter Winner Rating'
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                            {formik.touched.winnerRating && formik.errors.winnerRating ? (
                                                <div className='testimonialError'>{formik.errors.winnerRating}</div>
                                            ) : null}
                                        </div>

                                        <div className="addWinnerBtn  ">
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

export default AddWinners
