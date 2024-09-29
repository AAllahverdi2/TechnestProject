import React, { useRef, useState } from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { postManagement } from '../../../redux/slices/managementSlice';
const AddManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { management } = useSelector(state => state.management)

  const fileRef = useRef()
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    formik.setFieldValue('managementImage', file);
  };
  const selectFile = (e) => {
    e.preventDefault()
    fileRef.current.click()
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      managementImage: '',
      managementTitle: '',
      managementProfession: '',
      managementContent: '',
      managementInstagram: '',
      managementTwitter: '',
      managementFacebook: '',
      managementLinkedin: '',
    },
    validationSchema: Yup.object({
      managementProfession: Yup.string()
        .required('Management Profession Is Required'),
      managementTitle: Yup.string()
        .required('Management Title Required'),
      managementImage: Yup.mixed().required('Management Image Is Required'),
      managementContent: Yup.string()
        .required('Management Content Is Required'),

    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('managementProfession', values.managementProfession);
      formData.append('managementTitle', values.managementTitle);
      formData.append('managementImage', selectedFile);
      formData.append('managementContent', values.managementContent);
      formData.append('managementInstagram', values.managementInstagram);
      formData.append('managementTwitter', values.managementTwitter);
      formData.append('managementFacebook', values.managementFacebook);
      formData.append('managementLinkedin', values.managementLinkedin);

      dispatch(postManagement(formData));
      formik.resetForm()
      setSelectedFile(null)
      navigate('/admin/managementTable')
    },

  });

  return (
    <main className='addManagement ' >

      <Helmet>
        <title>Add Management</title>
      </Helmet>
      <div className="addManagementInside">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-12">
              <div className='addManagementInsideCard'>
                <div className="addManagementInsideCardBox">
                  <h4 >Add Management</h4>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="addManagementFormItem ">
                      <label htmlFor="managementTitle">Management Title</label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementTitle}
                        name='managementTitle'
                        type="text" id='managementTitle' placeholder='Enter Management Title' />
                      {formik.touched.managementTitle && formik.errors.managementTitle ? (
                        <div className='testimonialError'>{formik.errors.managementTitle}</div>
                      ) : null}

                    </div>

                    <div className="addManagementFormItem ">
                      <label htmlFor="managementImage">Management Image</label>
                      <input
                        type="file"
                        id='managementImage'
                        ref={fileRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                        name='managementImage'
                      />
                      <div className="managementFileInput col-xs-12">
                        <input
                          type="text" disabled value={selectedFile ? selectedFile.name : ''} placeholder='Enter Management Image' />
                        <span>
                          <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                        </span>

                      </div>
                      {formik.touched.managementImage && formik.errors.managementImage ? (
                        <div className='testimonialError'>{formik.errors.managementImage}</div>
                      ) : null}
                    </div>

                    <div className="addManagementFormItem ">
                      <label htmlFor="managementProfession">Management Profession</label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementProfession}
                        name='managementProfession'
                        type="text" id='managementProfession' placeholder='Enter Management Profession' />
                      {formik.touched.managementProfession && formik.errors.managementProfession ? (
                        <div className='testimonialError'>{formik.errors.managementProfession}</div>
                      ) : null}
                    </div>
                    <div className="addManagementFormItem ">
                      <label htmlFor="managementInstagram">Management Instagram</label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementInstagram}
                        name='managementInstagram'
                        type="text" id='managementInstagram' placeholder='Enter Management Instagram' />

                    </div>
                    <div className="addManagementFormItem ">
                      <label htmlFor="managementTwitter">Management Twitter</label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementTwitter}
                        name='managementTwitter'
                        type="text" id='managementTwitter' placeholder='Enter Management Twitter' />

                    </div>
                    <div className="addManagementFormItem ">
                      <label htmlFor="managementFacebook">Management Facebook</label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementFacebook}
                        name='managementFacebook'
                        type="text" id='managementFacebook' placeholder='Enter Management Facebook' />

                    </div>
                    <div className="addManagementFormItem ">
                      <label htmlFor="managementLinkedin">Management Linkedin</label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementLinkedin}
                        name='managementLinkedin'
                        type="text" id='managementLinkedin' placeholder='Enter Management Linkedin' />

                    </div>
                    <div className="addManagementFormItem ">
                      <label htmlFor="managementContent">Management Content</label>
                      <textarea
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.managementContent}
                        name='managementContent' id='managementContent' placeholder='Enter Management Content' cols="30" rows="10"></textarea>
                      {formik.touched.managementContent && formik.errors.managementContent ? (
                        <div className='testimonialError'>{formik.errors.managementContent}</div>
                      ) : null}
                    </div>
                    <div className="managementFormBtn  ">
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

export default AddManagement
