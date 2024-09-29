import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDataContext } from '../../../context/context';
import { editUser, getOneUser } from '../../../redux/slices/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#191c24',
  color: 'white',
  border: '0',
  boxShadow: 24,
  p: 4,
};

const AdminImageUpdateModal = () => {
  const { open, setOpen, handleClose, handleOpen } = useDataContext()



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
  }, [])
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
      toast.success('Your Image has been successfully updated')
      await dispatch(getOneUser(oneUser?._id))
      handleClose()
      setSelectedFile(null)

    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className='profileImageUpdateModal'
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography className='text-center' id="modal-modal-title" variant="h6" component="h2">
          Update Profile Image
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form className='adminImageUpdateModal' onSubmit={formik.handleSubmit}>

            <div className="imageUpdateModalAc ">
              <label htmlFor="accountSettingsImage">Profile Image *</label>
              <input
                type="file"
                id='accountSettingsImage'
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                name='profileImage'
              />
              <div className="adminImageModal col-xs-12">
                <input
                  type="text" disabled value={selectedFile ? selectedFile.name : 'No File Selected'} placeholder='Enter Image' />
                <span>
                  <button className='btn btn-primary' onClick={selectFile}>Upload</button>
                </span>

              </div>
              {formik.touched.profileImage && formik.errors.profileImage ? (
                <div className='testimonialError'>{formik.errors.profileImage}</div>
              ) : null}
            </div>
            <div className="w-100 updateImageButton">
              <button type='submit' className=" w-100 btn btn-outline-warning ">
                Update
              </button>
            </div>
          </form>
        </Typography>
      </Box>
    </Modal>
  )
}

export default AdminImageUpdateModal
