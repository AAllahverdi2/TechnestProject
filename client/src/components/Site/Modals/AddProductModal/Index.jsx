import React, { useEffect, useRef, useState } from 'react'
import './Index.scss'
import { FaEye, FaTrash } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import Countdown from 'react-countdown';
import generateProductSchema from '../../../../validations/productValidation';
import { getInitialFormikState } from '../../../../initialstate/productInitialState';
import { postProduct } from '../../../../redux/slices/producSlice';
import { jwtDecode } from 'jwt-decode';
const AddProductModal = () => {
  const { prodCreateRef, prodCreateModalOpen, prodCreateModalClose } = useDataContext()

  const dispatch = useDispatch()
  const { users, userToken } = useSelector(state => state.users)
  const currentDateTime = new Date().toISOString().slice(0, 16);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileRef = useRef()
  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
    formik.setFieldValue('productImages', [...formik.values.productImages, ...files]);
  };
  const removeImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);

    const updatedFormikImages = [...formik.values.productImages];
    updatedFormikImages.splice(index, 1);

    setSelectedFiles(updatedFiles);
    formik.setFieldValue('productImages', updatedFormikImages);
  };

  const selectFile = (e) => {
    e.preventDefault()
    fileRef.current.click()
  };
  const [userIds, setUserIds] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decode = jwtDecode(token)
      formik.setFieldValue('userId', decode.id);
      formik.setFieldValue('bidderId', decode.id);
      setUserIds(decode.id)
    }
  }, [])

  const [types, setTypes] = useState('')
  const formik = useFormik({
    initialValues: getInitialFormikState(types),
    validationSchema: generateProductSchema(types),

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('userId', userIds);
      formData.append('bidderId', userIds);
      formData.append('productName', values.productName);
      formData.append('productPrice', values.productPrice);
      formData.append('afterPrice', values.productPrice);
      formData.append('watching', values.watching);
      formData.append('totalBids', values.totalBids);
      formData.append('bidHistory', values.bidHistory);
      formData.append('minimumBidPrice', values.minimumBidPrice);
      formData.append('startTime', values.startTime);
      formData.append('endTime', values.endTime);
      formData.append('type', values.type);
      formData.append('productDescription', values.productDescription);
      formData.append('oneTimePurchase', values.oneTimePurchase);

      values.productImages.forEach((image, index) => {
        formData.append('productImages', image);
      });
      if (values.details) {
        if (values.type === 'car') {
          formData.append('brand', values.details.brand);
          formData.append('condition', values.details.condition);
          formData.append('model', values.details.model);
          formData.append('year', values.details.year);
          formData.append('fuel', values.details.fuel);
          formData.append('color', values.details.color);
          formData.append('mileage', values.details.mileage);
          formData.append('engine', values.details.engine);
          formData.append('transmission', values.details.transmission);
          formData.append('doors', values.details.doors);
        } else if (values.type === 'electronic') {
          formData.append('prodBrand', values.details.prodBrand);
          formData.append('series', values.details.series);
          formData.append('prodColor', values.details.prodColor);
          formData.append('hardDiskSize', values.details.hardDiskSize);
          formData.append('cpuModel', values.details.cpuModel);
          formData.append('ramMemory', values.details.ramMemory);

        } else if (values.type == 'jewelry') {
          formData.append('weight', values.details.weight);
          formData.append('purity', values.details.purity);
          formData.append('gemstone', values.details.gemstone);
          formData.append('metalType', values.details.metalType);
          formData.append('claspType', values.details.claspType);
          formData.append('gemstoneColor', values.details.gemstoneColor);
          formData.append('length', values.details.dimensions.length);
          formData.append('width', values.details.dimensions.width);
          formData.append('height', values.details.dimensions.height);
        }
      }
      await dispatch(postProduct(formData))
      prodCreateModalClose()
      setSelectedFiles([])
      formik.resetForm()
    },
  });



  return (
    <div className='addBid' ref={prodCreateRef}>
      <div className="addBidBox">
        <div className="closeBtn" onClick={prodCreateModalClose}>
          <IoClose />

        </div>
        <div className="addBidBoxInside">
          <div className="addBidBoxInsideTop">
            <h4>
              Create Product
            </h4>

          </div>
          <form className="addBidBoxInsideBottom" onSubmit={formik.handleSubmit}>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="productName">Name:</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productName}
                  placeholder='Enter Product Name'
                />

                {formik.touched.productName && formik.errors.productName ? (
                  <small style={{ color: 'red' }} >{formik.errors.productName}</small>
                ) : null}
              </div>
            </div>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="productPrice">Product Price:</label>
                <input
                  type="number"
                  min={1}
                  id="productPrice"
                  name="productPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productPrice}
                  placeholder='Enter Product Initial Price'
                />

                {formik.touched.productPrice && formik.errors.productPrice ? (
                  <small style={{ color: 'red' }} >{formik.errors.productPrice}</small>
                ) : null}
              </div>
            </div>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="minimumBidPrice">Minimum Bid:</label>
                <input
                  type="number"
                  min={1}
                  id="minimumBidPrice"
                  name="minimumBidPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.minimumBidPrice}
                  placeholder='Enter Minimum Bid Price'
                />

                {formik.touched.minimumBidPrice && formik.errors.minimumBidPrice ? (
                  <small style={{ color: 'red' }} >{formik.errors.minimumBidPrice}</small>
                ) : null}
              </div>
            </div>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="oneTimePurchase">One Time Purchase:</label>
                <input
                  type="number"
                  min={1}
                  id="oneTimePurchase"
                  name="oneTimePurchase"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.oneTimePurchase}
                  placeholder='Enter One Time Purchase'
                />

                {formik.touched.oneTimePurchase && formik.errors.oneTimePurchase ? (
                  <small style={{ color: 'red' }} >{formik.errors.oneTimePurchase}</small>
                ) : null}
              </div>
            </div>


            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="productImages">
                  Product Images
                </label>
                <input
                  type="file"
                  id='productImages'
                  ref={fileRef}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  onBlur={formik.handleBlur}
                  name='productImages'
                />
                <div className="addBidFile col-xs-12">
                  <input
                    type="text" disabled value={selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : ''} placeholder='Select Image(s)' />
                  <span>
                    <button className='blueBtn' onClick={selectFile}>Upload</button>
                  </span>

                </div>
                {formik.touched.profileImage && formik.errors.profileImage ? (
                  <small style={{ color: 'red' }} className='testimonialError'>{formik.errors.profileImage}</small>
                ) : null}

                <div style={{ display: selectedFiles.length == 0 ? "none " : '', border: selectedFiles.length == 0 ? " " : '1px solid #6d69f4' }} className="selectedImages w-100 row">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="selectedImageContainer  mt-2 col-md-3">
                      <div className="selectedImageBoxInside">
                        <img src={URL.createObjectURL(file)} alt={`Product Image ${index + 1}`} />
                        <button className='removeImageBtn' type="button" onClick={() => removeImage(index)}>
                          <FaTrash />

                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="startTime">
                  Auction Start Time:
                </label>
                <input value={formik.values.startTime} name='startTime' onChange={formik.handleChange} onBlur={formik.handleBlur} type="datetime-local" id="startTime" />
                {formik.touched.startTime && formik.errors.startTime ? (
                  <small style={{ color: 'red' }} >{formik.errors.startTime}</small>
                ) : null}
              </div>
            </div>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="endTime">
                  Auction End Time:
                </label>
                <input value={formik.values.endTime} min={currentDateTime} name='endTime' onChange={formik.handleChange} onBlur={formik.handleBlur} type="datetime-local" id="endTime" />
                {formik.touched.endTime && formik.errors.endTime ? (
                  <small style={{ color: 'red' }} >{formik.errors.endTime}</small>
                ) : null}
              </div>
            </div>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="productDescription">Description:</label>
                <textarea
                  type="text"
                  id="productDescription"
                  name="productDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productDescription}
                  placeholder='Enter Description'

                  cols="20" rows="10"></textarea>
                {formik.touched.productDescription && formik.errors.productDescription ? (
                  <small style={{ color: 'red' }} >{formik.errors.productDescription}</small>
                ) : null}
              </div>
            </div>
            <div className="addBidBoxItem">
              <div className='addBidBoxItemInside'>
                <label htmlFor="type">Type:</label>
                <select
                  id="type"
                  name="type"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setTypes(e.target.value);
                    formik.setFieldValue('details', {});
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="electronic">Electronic</option>
                  <option value="jewelry">Jewelry</option>
                </select>
                {formik.touched.type && formik.errors.type ? (
                  <small style={{ color: 'red' }} >{formik.errors.type}</small>
                ) : null}
              </div>
            </div>




            {formik.values.type === 'car' && (
              <div className="addBidItemsBox">
                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.brand">Brand:</label>
                    <input
                      type="text"
                      id="details.brand"
                      name="details.brand"
                      onChange={formik.handleChange}
                      placeholder='Enter Card Brand'
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.brand || ''}
                    />
                    {formik.touched.details?.brand && formik.errors.details?.brand ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.brand}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.condition">Condition:</label>
                    <input
                      type="text"
                      id="details.condition"
                      name="details.condition"
                      onChange={formik.handleChange}
                      placeholder='Enter Card Condition'

                      onBlur={formik.handleBlur}
                      value={formik.values.details?.condition || ''}
                    />
                    {formik.touched.details?.condition && formik.errors.details?.condition ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.condition}</small>
                    ) : null}
                  </div>
                </div>



                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.model">Model:</label>
                    <input
                      type="text"
                      id="details.model"
                      name="details.model"
                      onChange={formik.handleChange}
                      placeholder='Enter Card Model'

                      onBlur={formik.handleBlur}
                      value={formik.values.details?.model || ''}
                    />
                    {formik.touched.details?.model && formik.errors.details?.model ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.model}</small>
                    ) : null}
                  </div>
                </div>

                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.year">Year:</label>
                    <input
                      type="number"
                      id="details.year"
                      name="details.year"
                      min={1960}
                      max={2025}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Card Year'

                      value={formik.values.details?.year || ''}
                    />
                    {formik.touched.details?.year && formik.errors.details?.year ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.year}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.fuel">Select Car Fuel Type:</label>
                    <select
                      id="details.fuel"
                      name="details.fuel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.fuel}
                    >
                      <option value="">Select Car Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="NaturalGas">Natural Gas</option>
                    </select>
                    {formik.touched.details?.fuel && formik.errors.details?.fuel ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.fuel}</small>
                    ) : null}
                  </div>
                </div>



                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.color">Select Car Color:</label>
                    <select
                      id="details.color"
                      name="details.color"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.color}
                    >
                      <option value="">Select Car Color</option>
                      <option value="White">White</option>
                      <option value="Black">Black</option>
                      <option value="Silver">Silver</option>
                      <option value="Blue">Blue</option>
                      <option value="Red">Red</option>
                      <option value="Green">Green</option>
                      <option value="Gray">Gray</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Orange">Orange</option>
                      <option value="Brown">Brown</option>
                      <option value="Beige">Beige</option>
                      <option value="Purple">Purple</option>
                      <option value="Pink">Pink</option>
                      <option value="Gold">Gold</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Copper">Copper</option>
                      <option value="Burgundy">Burgundy</option>
                      <option value="Champagne">Champagne</option>
                      <option value="Cream">Cream</option>
                      <option value="Turquoise">Turquoise</option>
                      <option value="Lavender">Lavender</option>
                      <option value="Teal">Teal</option>
                      <option value="Maroon">Maroon</option>
                      <option value="Olive">Olive</option>
                      <option value="Mint">Mint</option>
                      <option value="Taupe">Taupe</option>
                      <option value="Salmon">Salmon</option>
                      <option value="Charcoal">Charcoal</option>
                      <option value="Navy">Navy</option>
                      <option value="Mauve">Mauve</option>
                      <option value="Peach">Peach</option>
                      <option value="Khaki">Khaki</option>
                      <option value="Plum">Plum</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Indigo">Indigo</option>
                      <option value="Violet">Violet</option>
                      <option value="Sapphire">Sapphire</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Topaz">Topaz</option>
                      <option value="Amethyst">Amethyst</option>
                      <option value="Pearl">Pearl</option>
                      <option value="Coral">Coral</option>
                      <option value="Brass">Brass</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Steel">Steel</option>
                      <option value="Rose">Rose</option>
                      <option value="Magenta">Magenta</option>
                      <option value="Titanium">Titanium</option>
                      <option value="Auburn">Auburn</option>
                      <option value="Azure">Azure</option>
                      <option value="Bisque">Bisque</option>
                      <option value="Buff">Buff</option>
                      <option value="Celadon">Celadon</option>
                      <option value="Chartreuse">Chartreuse</option>
                      <option value="Russet">Russet</option>
                      <option value="Seashell">Seashell</option>
                      <option value="Vermilion">Vermilion</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Melon">Melon</option>
                      <option value="Cerulean">Cerulean</option>
                      <option value="Lavenderblush">Lavender Blush</option>
                      <option value="Peridot">Peridot</option>
                      <option value="Mahogany">Mahogany</option>
                      <option value="Sepia">Sepia</option>
                      <option value="Periwinkle">Periwinkle</option>
                      <option value="Drab">Drab</option>
                      <option value="Cinnabar">Cinnabar</option>
                      <option value="Rust">Rust</option>
                      <option value="Olivine">Olivine</option>
                      <option value="Sienna">Sienna</option>
                      <option value="Bone">Bone</option>
                      <option value="Citron">Citron</option>
                      <option value="Garnet">Garnet</option>
                      <option value="Ivory">Ivory</option>
                      <option value="Jade">Jade</option>
                      <option value="Linen">Linen</option>
                      <option value="Magenta">Magenta</option>
                      <option value="Obsidian">Obsidian</option>
                      <option value="Rosewood">Rosewood</option>
                      <option value="Sable">Sable</option>
                      <option value="Teak">Teak</option>
                      <option value="Umber">Umber</option>
                      <option value="Vanilla">Vanilla</option>
                    </select>
                    {formik.touched.details?.color && formik.errors.details?.color ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.color}</small>
                    ) : null}
                  </div>
                </div>

                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.mileage">Mileage:</label>
                    <input
                      type="number"
                      id="details.mileage"
                      name="details.mileage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Card Mileage'

                      value={formik.values.details?.mileage || ''}
                    />
                    {formik.touched.details?.mileage && formik.errors.details?.mileage ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.mileage}</small>
                    ) : null}
                  </div>
                </div>
                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.engine">Engine:</label>
                    <input
                      type="text"
                      id="details.engine"
                      name="details.engine"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Card Engine'

                      value={formik.values.details?.engine || ''}
                    />
                    {formik.touched.details?.engine && formik.errors.details?.engine ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.engine}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.transmission">Select Car Transmission:</label>
                    <select
                      id="details.transmission"
                      name="details.transmission"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.transmission}
                    >
                      <option value="">Select Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Semi-Automatic">Semi-Automatic</option>
                      <option value="Continuously Variable">Continuously Variable Transmission (CVT)</option>
                      <option value="Dual-Clutch">Dual-Clutch Transmission (DCT)</option>
                      <option value="Automated Manual">Automated Manual Transmission (AMT)</option>
                      <option value="Tiptronic">Tiptronic Transmission</option>
                      <option value="CVT">CVT (Continuously Variable Transmission)</option>
                      <option value="AMG Speedshift">AMG Speedshift Transmission</option>
                      <option value="Direct Shift Gearbox">Direct Shift Gearbox (DSG)</option>
                      <option value="Electro-Hydraulic Manual">Electro-Hydraulic Manual Transmission (EHMT)</option>
                      <option value="Electro-Mechanical Manual">Electro-Mechanical Manual Transmission (EMMT)</option>
                      <option value="Torque Converter">Torque Converter Automatic Transmission</option>
                      <option value="Sequential">Sequential Manual Transmission</option>
                      <option value="Hydraulic">Hydraulic Automatic Transmission</option>
                      <option value="Centrifugal">Centrifugal Clutch Automatic Transmission</option>
                      <option value="Hydrostatic">Hydrostatic Transmission</option>
                      <option value="Epicyclic">Epicyclic (Planetary) Gear Automatic Transmission</option>
                      <option value="Infinitely Variable">Infinitely Variable Transmission (IVT)</option>
                      <option value="Torque Vectoring">Torque Vectoring Transmission</option>
                      <option value="Electric">Electric Transmission</option>

                    </select>

                    {formik.touched.details?.transmission && formik.errors.details?.transmission ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.transmission}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.doors">Doors:</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      id="details.doors"
                      name="details.doors"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Card doors'

                      value={formik.values.details?.doors || ''}
                    />
                    {formik.touched.details?.doors && formik.errors.details?.doors ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.doors}</small>
                    ) : null}
                  </div>
                </div>

              </div>

            )}



            {formik.values.type === 'electronic' && (
              <div className="addBidItemsBox">
                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.prodBrand">Brand:</label>
                    <input
                      type="text"
                      id="details.prodBrand"
                      name="details.prodBrand"
                      onChange={formik.handleChange}
                      placeholder='Enter Product Brand'
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.prodBrand || ''}
                    />
                    {formik.touched.details?.prodBrand && formik.errors.details?.prodBrand ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.prodBrand}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.series">Series:</label>
                    <input
                      type="text"
                      id="details.series"
                      name="details.series"
                      onChange={formik.handleChange}
                      placeholder='Enter Product Series'
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.series || ''}
                    />
                    {formik.touched.details?.series && formik.errors.details?.series ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.series}</small>
                    ) : null}
                  </div>
                </div>
                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.prodColor">Choose a Color:</label>

                    <select
                      id="details.prodColor"
                      name="details.prodColor"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.prodColor}
                    >
                      <option value="">Select Product Color</option>
                      <option value="White">White</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Pink">Pink</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                      <option value="Red">Red</option>
                      <option value="Orange">Orange</option>
                      <option value="Purple">Purple</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      <option value="Grey">Grey</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Turquoise">Turquoise</option>
                      <option value="Lime">Lime</option>
                      <option value="Aqua">Aqua</option>
                      <option value="Magenta">Magenta</option>
                      <option value="Yellowgreen">Yellow-Green</option>
                      <option value="Cyan">Cyan</option>
                      <option value="Burgundy">Burgundy</option>
                      <option value="Navy">Navy</option>
                      <option value="Olive">Olive</option>
                      <option value="Maroon">Maroon</option>
                      <option value="Salmon">Salmon</option>
                      <option value="Tan">Tan</option>
                      <option value="Teal">Teal</option>
                      <option value="Violet">Violet</option>
                      <option value="Indigo">Indigo</option>
                      <option value="Crimson">Crimson</option>
                    </select>
                    {formik.touched.details?.prodColor && formik.errors.details?.prodColor ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.prodColor}</small>
                    ) : null}
                  </div>
                </div>
                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.hardDiskSize">Select A Hard Disk Size:</label>

                    <select
                      id="details.hardDiskSize"
                      name="details.hardDiskSize"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.hardDiskSize}
                    >
                      <option value="">Select Size</option>
                      <option value="2GB">2GB</option>
                      <option value="4GB">4GB</option>
                      <option value="8GB">8GB</option>
                      <option value="16GB">16GB</option>
                      <option value="32GB">32GB</option>
                      <option value="64GB">64GB</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                      <option value="2TB">2TB</option>
                      <option value="3TB">3TB</option>
                      <option value="4TB">4TB</option>
                      <option value="5TB">5TB</option>
                      <option value="6TB">6TB</option>
                      <option value="8TB">8TB</option>
                      <option value="10TB">10TB</option>
                      <option value="12TB">12TB</option>
                      <option value="14TB">14TB</option>
                      <option value="16TB">16TB</option>
                      <option value="20TB">20TB</option>
                      <option value="24TB">24TB</option>
                      <option value="30TB">30TB</option>
                      <option value="32TB">32TB</option>
                      <option value="40TB">40TB</option>
                      <option value="48TB">48TB</option>
                      <option value="50TB">50TB</option>
                      <option value="64TB">64TB</option>
                      <option value="80TB">80TB</option>
                      <option value="100TB">100TB</option>
                      <option value="120TB">120TB</option>
                      <option value="128TB">128TB</option>
                      <option value="160TB">160TB</option>
                      <option value="200TB">200TB</option>
                      <option value="256TB">256TB</option>
                      <option value="300TB">300TB</option>
                      <option value="512TB">512TB</option>
                    </select>
                    {formik.touched.details?.hardDiskSize && formik.errors.details?.hardDiskSize ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.hardDiskSize}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.cpuModel">Select A Cpu Model:</label>

                    <select
                      id="details.cpuModel"
                      name="details.cpuModel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.cpuModel}
                    >
                      <option value="">Select Cpu Model</option>
                      <option value="Intel Core i3">Intel Core i3</option>
                      <option value="Intel Core i5">Intel Core i5</option>
                      <option value="Intel Core i7">Intel Core i7</option>
                      <option value="Intel Core i9">Intel Core i9</option>
                      <option value="AMD Ryzen 3">AMD Ryzen 3</option>
                      <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                      <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                      <option value="AMD Ryzen 9">AMD Ryzen 9</option>
                      <option value="Apple M1">Apple M1</option>
                      <option value="Apple M1 Pro">Apple M1 Pro</option>
                      <option value="Apple M1 Max">Apple M1 Max</option>
                      <option value="Qualcomm Snapdragon">Qualcomm Snapdragon</option>
                      <option value="Samsung Exynos">Samsung Exynos</option>
                      <option value="ARM Cortex">ARM Cortex</option>
                      <option value="Mediatek Helio">Mediatek Helio</option>
                      <option value="NVIDIA Tegra">NVIDIA Tegra</option>
                      <option value="IBM Power">IBM Power</option>
                      <option value="Intel Xeon">Intel Xeon</option>
                      <option value="AMD EPYC">AMD EPYC</option>
                      <option value="Qualcomm Centriq">Qualcomm Centriq</option>
                      <option value="IBM z15">IBM z15</option>
                      <option value="Snapdragon 8cx">Snapdragon 8cx</option>
                      <option value="Ryzen Threadripper">Ryzen Threadripper</option>
                      <option value="Exynos 2100">Exynos 2100</option>
                      <option value="Snapdragon 888">Snapdragon 888</option>
                      <option value="Helio G90T">Helio G90T</option>
                      <option value="Xeon Platinum">Xeon Platinum</option>
                      <option value="EPYC Milan">EPYC Milan</option>
                    </select>
                    {formik.touched.details?.cpuModel && formik.errors.details?.cpuModel ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.cpuModel}</small>
                    ) : null}
                  </div>
                </div>


                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.ramMemory">Select A Ram Size:</label>

                    <select
                      id="details.ramMemory"
                      name="details.ramMemory"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.ramMemory}
                    >
                      <option value="">Select Ram</option>
                      <option value="2GB">2GB</option>
                      <option value="4GB">4GB</option>
                      <option value="8GB">8GB</option>
                      <option value="16GB">16GB</option>
                      <option value="32GB">32GB</option>
                      <option value="64GB">64GB</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                      <option value="2TB">2TB</option>
                      <option value="4TB">4TB</option>
                      <option value="8TB">8TB</option>
                    </select>
                    {formik.touched.details?.ramMemory && formik.errors.details?.ramMemory ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.ramMemory}</small>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {formik.values.type === 'jewelry' && (
              <div className="addBidItemsBox">

                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.weight">Weight:</label>
                    <input
                      type="number"
                      id="details.weight"
                      name="details.weight"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Product Weight'

                      value={formik.values.details?.weight || ''}
                    />
                    {formik.touched.details?.weight && formik.errors.details?.weight ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.weight}</small>
                    ) : null}
                  </div>
                </div>

                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.purity">Select Gold Purity:</label>
                    <select
                      id="details.purity"
                      name="details.purity"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.purity}
                    >
                      <option value="">Select Purity</option>
                      <option value="24K">24 Karat (Pure Gold)</option>
                      <option value="23K">23 Karat</option>
                      <option value="22K">22 Karat</option>
                      <option value="21K">21 Karat</option>
                      <option value="20K">20 Karat</option>
                      <option value="19K">19 Karat</option>
                      <option value="18K">18 Karat</option>
                      <option value="17K">17 Karat</option>
                      <option value="16K">16 Karat</option>
                      <option value="15K">15 Karat</option>
                      <option value="14K">14 Karat</option>
                      <option value="13K">13 Karat</option>
                      <option value="12K">12 Karat</option>
                      <option value="11K">11 Karat</option>
                      <option value="10K">10 Karat</option>
                    </select>

                    {formik.touched.details?.purity && formik.errors.details?.purity ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.purity}</small>
                    ) : null}
                  </div>
                </div>

                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.gemstone">Select Gemstone:</label>
                    <select
                      id="details.gemstone"
                      name="details.gemstone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.gemstone}
                    >
                      <option value="">Select Gemstone</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Sapphire">Sapphire</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Amethyst">Amethyst</option>
                      <option value="Aquamarine">Aquamarine</option>
                      <option value="Topaz">Topaz</option>
                      <option value="Opal">Opal</option>
                      <option value="Garnet">Garnet</option>
                      <option value="Peridot">Peridot</option>
                      <option value="Tourmaline">Tourmaline</option>
                      <option value="Citrine">Citrine</option>
                      <option value="Turquoise">Turquoise</option>
                      <option value="Pearl">Pearl</option>
                      <option value="Onyx">Onyx</option>
                      <option value="Jade">Jade</option>
                      <option value="Lapis Lazuli">Lapis Lazuli</option>
                      <option value="Moonstone">Moonstone</option>
                      <option value="Alexandrite">Alexandrite</option>
                      <option value="Peruvian Blue Opal">Peruvian Blue Opal</option>
                      <option value="Ametrine">Ametrine</option>
                      <option value="Agate">Agate</option>
                      <option value="Tanzanite">Tanzanite</option>
                      <option value="Zircon">Zircon</option>
                      <option value="Coral">Coral</option>
                      <option value="Sunstone">Sunstone</option>
                      <option value="Kunzite">Kunzite</option>
                      <option value="Rhodolite">Rhodolite</option>
                      <option value="Carnelian">Carnelian</option>
                      <option value="Chrysoberyl">Chrysoberyl</option>
                      <option value="Malachite">Malachite</option>
                      <option value="Smoky Quartz">Smoky Quartz</option>
                      <option value="Sardonyx">Sardonyx</option>
                      <option value="Apatite">Apatite</option>
                      <option value="Iolite">Iolite</option>
                      <option value="Bloodstone">Bloodstone</option>
                      <option value="Labradorite">Labradorite</option>
                      <option value="Hematite">Hematite</option>
                      <option value="Jasper">Jasper</option>
                      <option value="Sodalite">Sodalite</option>
                      <option value="Green Tourmaline">Green Tourmaline</option>
                      <option value="Black Tourmaline">Black Tourmaline</option>
                      <option value="Red Spinel">Red Spinel</option>
                      <option value="Blue Spinel">Blue Spinel</option>
                    </select>

                    {formik.touched.details?.gemstone && formik.errors.details?.gemstone ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.gemstone}</small>
                    ) : null}
                  </div>
                </div>
                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.metalType">Select Metal Type:</label>
                    <select
                      id="details.metalType"
                      name="details.metalType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.metalType}
                    >
                      <option value="">Select Metal Type</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Palladium">Palladium</option>
                      <option value="Titanium">Titanium</option>
                      <option value="Stainless Steel">Stainless Steel</option>
                      <option value="White Gold">White Gold</option>
                      <option value="Rose Gold">Rose Gold</option>
                      <option value="Yellow Gold">Yellow Gold</option>
                      <option value="Brass">Brass</option>
                      <option value="Copper">Copper</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Aluminum">Aluminum</option>
                      <option value="Nickel">Nickel</option>
                      <option value="Zinc">Zinc</option>
                      <option value="Tungsten">Tungsten</option>
                      <option value="Rhodium">Rhodium</option>
                      <option value="Iridium">Iridium</option>
                      <option value="Steel">Steel</option>
                      <option value="Iron">Iron</option>
                      <option value="Plated">Plated</option>
                      <option value="Cobalt">Cobalt</option>
                      <option value="Bismuth">Bismuth</option>
                      <option value="Magnesium">Magnesium</option>
                      <option value="Pewter">Pewter</option>
                      <option value="Tin">Tin</option>
                      <option value="Ruthenium">Ruthenium</option>
                      <option value="Vanadium">Vanadium</option>
                      <option value="Zirconium">Zirconium</option>
                      <option value="Niobium">Niobium</option>
                      <option value="Lead">Lead</option>
                      <option value="Manganese">Manganese</option>
                      <option value="Antimony">Antimony</option>
                      <option value="Cadmium">Cadmium</option>
                      <option value="Indium">Indium</option>
                      <option value="Lithium">Lithium</option>
                      <option value="Mercury">Mercury</option>
                      <option value="Uranium">Uranium</option>
                      <option value="Plutonium">Plutonium</option>
                      <option value="Tantalum">Tantalum</option>
                      <option value="Hafnium">Hafnium</option>
                    </select>

                    {formik.touched.details?.metalType && formik.errors.details?.metalType ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.metalType}</small>
                    ) : null}
                  </div>
                </div>

                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.claspType">Select a Clasp Type:</label>
                    <select
                      id="details.claspType"
                      name="details.claspType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.claspType}
                    >
                      <option value="">Select a Clasp Type</option>
                      <option value="Spring Ring">Spring Ring</option>
                      <option value="Lobster Claw">Lobster Claw</option>
                      <option value="Toggle Clasp">Toggle Clasp</option>
                      <option value="Box Clasp">Box Clasp</option>
                      <option value="Hook and Eye">Hook and Eye</option>
                      <option value="Magnetic Clasp">Magnetic Clasp</option>
                      <option value="Slide Lock">Slide Lock</option>
                      <option value="S Hook">S Hook</option>
                      <option value="Fish Hook">Fish Hook</option>
                      <option value="Toggle and Bar">Toggle and Bar</option>
                      <option value="Barrel Clasp">Barrel Clasp</option>
                      <option value="Screw Clasp">Screw Clasp</option>
                      <option value="Box and Tongue">Box and Tongue</option>
                      <option value="Push Button Clasp">Push Button Clasp</option>
                      <option value="Bayonet Clasp">Bayonet Clasp</option>
                      <option value="Ball Clasp">Ball Clasp</option>
                      <option value="Slide Insert Clasp">Slide Insert Clasp</option>
                      <option value="Snap Lock Clasp">Snap Lock Clasp</option>
                      <option value="Infinity Clasp">Infinity Clasp</option>
                      <option value="Bar and Ring Clasp">Bar and Ring Clasp</option>
                      <option value="Multi-Strand Clasp">Multi-Strand Clasp</option>
                      <option value="Magnetic Barrel Clasp">Magnetic Barrel Clasp</option>
                    </select>

                    {formik.touched.details?.claspType && formik.errors.details?.claspType ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.claspType}</small>
                    ) : null}
                  </div>
                </div>



                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.gemstoneColor">Select Gemstone Color:</label>
                    <select
                      id="details.gemstoneColor"
                      name="details.gemstoneColor"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details?.gemstoneColor}
                    >
                      <option value="">Select Gemstone Color</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Purple">Purple</option>
                      <option value="Orange">Orange</option>
                      <option value="Pink">Pink</option>
                      <option value="Brown">Brown</option>
                      <option value="White">White</option>
                      <option value="Black">Black</option>
                      <option value="Gray">Gray</option>
                      <option value="Turquoise">Turquoise</option>
                      <option value="Lavender">Lavender</option>
                      <option value="Amber">Amber</option>
                      <option value="Teal">Teal</option>
                      <option value="Indigo">Indigo</option>
                      <option value="Magenta">Magenta</option>
                      <option value="Olive">Olive</option>
                      <option value="Cyan">Cyan</option>
                      <option value="Maroon">Maroon</option>
                      <option value="Lime">Lime</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Pearlescent">Pearlescent</option>
                      <option value="Multi-Color">Multi-Color</option>
                    </select>

                    {formik.touched.details?.gemstoneColor && formik.errors.details?.gemstoneColor ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.gemstoneColor}</small>
                    ) : null}
                  </div>
                </div>



                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.dimensions.length">Product Length:</label>
                    <input
                      type="number"
                      min={1}
                      id="details.dimensions.length"
                      name="details.dimensions.length"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Product Length'

                      value={formik.values.details?.dimensions?.length || ''}
                    />
                    {formik.touched.details?.dimensions?.length && formik.errors.details?.dimensions?.length ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.dimensions?.length}</small>
                    ) : null}
                  </div>
                </div>





                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.dimensions.width">Product Width:</label>
                    <input
                      type="number"
                      min={1}
                      id="details.dimensions.width"
                      name="details.dimensions.width"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Product Width'

                      value={formik.values.details?.dimensions?.width || ''}
                    />
                    {formik.touched.details?.dimensions?.width && formik.errors.details?.dimensions?.width ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.dimensions?.width}</small>
                    ) : null}
                  </div>
                </div>




                <div className="addBidBoxItem">
                  <div className='addBidBoxItemInside'>
                    <label htmlFor="details.dimensions.height">Product Height:</label>
                    <input
                      type="number"
                      min={1}
                      id="details.dimensions.height"
                      name="details.dimensions.height"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Enter Product Height'

                      value={formik.values.details?.dimensions?.height || ''}
                    />
                    {formik.touched.details?.dimensions?.height && formik.errors.details?.dimensions?.height ? (
                      <small style={{ color: 'red' }} >{formik.errors.details?.dimensions?.height}</small>
                    ) : null}
                  </div>
                </div>
              </div>
            )}





            <div className="addBidBoxItem mt-3">
              <button type='submit' className="addBidBtn">
                Create Product
              </button>

            </div>
          </form>
        </div>
      </div>
      <Toaster position='top-left' />
    </div>
  )
}

export default AddProductModal
