import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { editUser } from '../../../../redux/slices/userSlice';

const UserImageModal = () => {

  const { userImageModalRef, handleCloseImageUpdate } = useDataContext()

  const dispatch = useDispatch()
  const { users, userToken, oneUser } = useSelector(state => state.users)
  const fileName = oneUser?.profileImage?.split('-').pop();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef()
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      formik.setFieldValue('profileImage', file);
    }
  };
  const selectFile = (e) => {
    e.preventDefault()
    fileRef.current.click()
  };
  useEffect(() => {
    formik.setValues({
      profileImage: oneUser?.profileImage || '',
    })
  }, [oneUser])
  const formik = useFormik({
    initialValues: {
      profileImage: '',
    },
    validationSchema: Yup.object({
      profileImage: Yup.mixed().required('Profile Image is required'),
    }),

    onSubmit: async (values) => {

      const formData = new FormData();
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }
      await dispatch(
        editUser({ id: userToken.id, newData: { profileImage: formData.get('profileImage') } })
      );

      setSelectedFile(null)
      handleCloseImageUpdate()

    },
  });
  return (
    <div className='userImageModal' ref={userImageModalRef}>
      <div className="userImageModalBox">
        <div className="closeBtn" onClick={handleCloseImageUpdate}>
          <IoClose />

        </div>
        <div className="userImageModalBoxInside">
          <div className="userImageModalInsideTop">
            <h4>
              Update Image
            </h4>

          </div>
          <form className="userImageModalInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="userModalItem">
              <div className='userModalItemInside'>
                <label htmlFor="profileImageUt">
                  Profile Image
                </label>
                <input
                  type="file"
                  id='profileImageUt'
                  ref={fileRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  name='profileImage'
                />
                <div className="userImageUpdate col-xs-12">
                  <input
                    type="text" disabled value={selectedFile ? selectedFile.name : 'No file selected'} placeholder='Enter Profile Image' />
                  <span>
                    <button type='button' className='blueBtn' onClick={selectFile}>Upload</button>
                  </span>

                </div>
                {formik.touched.profileImage && formik.errors.profileImage ? (
                  <small style={{ color: 'red' }} className='testimonialError'>{formik.errors.profileImage}</small>
                ) : null}
              </div>

            </div>


            <div className="userModalItem">
              <button type='submit' className="userModalItemSignUp">
                Update
              </button>

            </div>
          </form>
        </div>
      </div>
      <Toaster position='top-left' />
    </div>
  )
}

export default UserImageModal
