import React, { useRef, useState } from 'react'
import './Index.scss'
import bidNm from '../../../../assets/bidNm.png'

import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDataContext } from '../../../../context/context';
import { Link } from 'react-router-dom';
import { postOrder } from '../../../../redux/slices/orderSlice';
import { deleteMultipleProducts, deleteProduct } from '../../../../redux/slices/producSlice';
import { clearBasket, clearUserBasket, clearWinningProduct } from '../../../../redux/slices/userSlice';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const CheckoutModal = () => {
    const { openCheckout, handleOpenCheckout, handleRemoveCheckout, paymentSuccess } = useDataContext()

    const dispatch = useDispatch()
    const { userToken } = useSelector(state => state.users)

    let basketTotalPrice = 0
    let basketTotalAmount = userToken?.basket?.length

    const publishKey = "pk_test_51Q4RpWEVKtneHOylOpbrDI2vtT032P823ITvAxKrDbSUXE0maCRCPfIB2gZzyxHwXykGRKkGiybEKkyyV40qw67K0097MOW8FI"

    const handleCheckOut = async () => {
        const productsContent = {
            products: userToken?.basket
        };

        try {
            const stripe = await loadStripe(publishKey);
            const res = await axios.post('http://localhost:5050/payment', productsContent);


            if (res.status !== 200) {
                console.log("Ödeme işlemi başarısız oldu.");
            } else {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.id,
                });
                toast.success('Payment successful!');

                if (result.error) {
                    throw new Error(result.error.message);
                } else {

                }
            }
        } catch (error) {
            console.error("An error occurred during checkout:", error.message);
            toast.error('Payment failed. Please try again.');
        }
    };
    const formik = useFormik({
        initialValues: {
            orderedUserId: null,
            orderFirstName: '',
            orderLastName: '',
            orderAddress: '',
            orderApartments: '',
            orderCity: '',
            orderCountry: '',
            orderTotalPrice: 0,
            orderTotalAmount: 0,
            orderPhone: '',
            orderGmail: '',
            orderStatus: 'Pending',
            items: [],
        },
        validationSchema: Yup.object({
            orderFirstName: Yup.string().required('First name is required'),
            orderLastName: Yup.string().required('Last name is required'),
            orderAddress: Yup.string().required('Address is required'),
            orderApartments: Yup.string().required('Apartments is required'),
            orderCity: Yup.string().required('City is required'),
            orderCountry: Yup.string().required('Country is required'),
            orderPhone: Yup.string().required('Phone is required'),
            orderGmail: Yup.string().email('Invalid email format').required('Gmail is required'),
            orderStatus: Yup.string().oneOf(['Pending', 'Accept', 'Reject']).default('Pending'),
            items: Yup.array().of(Yup.string()),
        }),

        onSubmit: async (values) => {
            const basketItems = userToken?.basket.map((item) => item);
            const postedProduct = {
                orderedUserId: userToken?.id,
                orderFirstName: values.orderFirstName,
                orderLastName: values.orderLastName,
                orderAddress: values.orderAddress,
                orderApartments: values.orderApartments,
                orderCity: values.orderCity,
                orderCountry: values.orderCountry,
                orderPhone: values.orderPhone,
                orderGmail: values.orderGmail,
                orderStatus: values.orderStatus,
                items: basketItems,
                orderTotalPrice: basketTotalPrice,
                orderTotalAmount: basketTotalAmount,
            }


            handleCheckOut()


            dispatch(postOrder(postedProduct))
            dispatch(clearBasket({ id: userToken?.id }))
            dispatch(deleteMultipleProducts(
                userToken?.basket?.map(product => product._id)
            ));
       
            formik.resetForm()
            handleRemoveCheckout()

        },
    });
    return (
        <div className='checkOutForm' ref={openCheckout}>
            <div className="checkOutFormBox">
                <div className="closeBtn" onClick={handleRemoveCheckout}>
                    <IoClose />

                </div>
                <div className="checkOutFormBoxInside">
                    <div className="checkFormBoxInsideTop">
                        <h4>
                            Checkout Details
                        </h4>

                    </div>
                    <form className="checkFormBoxInsideBottom" onSubmit={formik.handleSubmit}>
                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderFirstName">
                                    First Name
                                </label>
                                <input value={formik.values.orderFirstName} name='orderFirstName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="orderFirstName" placeholder="First Name" />
                                {formik.touched.orderFirstName && formik.errors.orderFirstName ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderFirstName}</small>
                                ) : null}
                            </div>


                        </div>

                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderLastName">
                                    Last Name
                                </label>
                                <input value={formik.values.orderLastName} name='orderLastName' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="orderLastName" placeholder="Last Name" />
                                {formik.touched.orderLastName && formik.errors.orderLastName ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderLastName}</small>
                                ) : null}
                            </div>


                        </div>

                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderGmail">
                                    Gmail
                                </label>
                                <input value={formik.values.orderGmail} name='orderGmail' onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="orderGmail" placeholder="Gmail" />
                                {formik.touched.orderGmail && formik.errors.orderGmail ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderGmail}</small>
                                ) : null}
                            </div>


                        </div>

                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderPhone">
                                    Phone
                                </label>
                                <input value={formik.values.orderPhone} name='orderPhone' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="orderPhone" placeholder="Phone" />
                                {formik.touched.orderPhone && formik.errors.orderPhone ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderPhone}</small>
                                ) : null}
                            </div>


                        </div>



                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderAddress">
                                    Address
                                </label>
                                <input value={formik.values.orderAddress} name='orderAddress' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="orderAddress" placeholder="Address" />
                                {formik.touched.orderAddress && formik.errors.orderAddress ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderAddress}</small>
                                ) : null}
                            </div>


                        </div>


                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderApartments">
                                    Apartments
                                </label>
                                <input value={formik.values.orderApartments} name='orderApartments' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="orderApartments" placeholder="Apartments" />
                                {formik.touched.orderApartments && formik.errors.orderApartments ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderApartments}</small>
                                ) : null}
                            </div>


                        </div>

                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderCity">
                                    City
                                </label>
                                <input value={formik.values.orderCity} name='orderCity' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="orderCity" placeholder="City" />
                                {formik.touched.orderCity && formik.errors.orderCity ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderCity}</small>
                                ) : null}
                            </div>


                        </div>

                        <div className="checkOutItem">
                            <div className='checkOutItemInside'>
                                <label htmlFor="orderCountry">
                                    Country
                                </label>
                                <select
                                    value={formik.values.orderCountry}
                                    name="orderCountry"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="orderCountry"
                                >
                                    <option value="" label='Select Country'></option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cabo Verde">Cabo Verde</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
                                    <option value="Congo, Republic of the">Congo, Republic of the</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czechia">Czechia</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Eswatini">Eswatini</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea, North">Korea, North</option>
                                    <option value="Korea, South">Korea, South</option>
                                    <option value="Kosovo">Kosovo</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>

                                </select>
                                {formik.touched.orderCountry && formik.errors.orderCountry ? (
                                    <small style={{ color: 'red' }} className='registerError'>{formik.errors.orderCountry}</small>
                                ) : null}
                            </div>
                        </div>

                        <div className="checkOutItem">
                            <div className="row">

                                {
                                    userToken?.basket?.map((item, index) => {
                                        basketTotalPrice += item.oneTimePurchase
                                        return <div key={index} className="col-md-12">
                                            <div className=" checkOutCards mb-3">
                                                <div className="checkOutCardsLeft">
                                                    <img src={item.productImages.length > 0 ? `http://localhost:5050/public/${item.productImages[0]}` : 'fallbackImageURL'} alt="exampleImage" />

                                                    <Link
                                                        onClick={async () => {
                                                            window.scrollTo({
                                                                top: 0,
                                                                behavior: 'smooth'
                                                            });
                                                        }} to={`/product/${item._id}`}
                                                        className='details2'>
                                                        <img src={bidNm} alt="bid" />
                                                    </Link>
                                                </div>
                                                <div className="checkOutCardsRight">
                                                    <h5>

                                                        <Link onClick={async () => {
                                                            window.scrollTo({
                                                                top: 0,
                                                                behavior: 'smooth'
                                                            });
                                                        }} to={`/product/${item._id}`} >
                                                            {item.productName}
                                                        </Link>
                                                    </h5>
                                                    <div className="checkOutCardsRightMiddle">
                                                        <div className="checkOutCardsRightLeft">
                                                            <h6>
                                                                price
                                                            </h6>

                                                            <h6 className="price2">${item.oneTimePurchase}</h6>
                                                        </div>
                                                        <div className="checkOutCardsRightRight">
                                                            <h6>
                                                                Product Type:
                                                            </h6>
                                                            <h6 className="aucId">
                                                                {
                                                                    item.type == 'electronic' ? 'Electronic' :
                                                                        item.type == 'car' ? 'Car' :
                                                                            item.type == 'jewelry' ? 'Jewelry' : ''
                                                                }
                                                            </h6>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="checkOutItem">
                            <p className="checkoutTotalPrice">
                                Total: <span>${basketTotalPrice}</span>

                            </p>
                            <p className="checkoutTotalPrice">
                                Total Amount: <span>{basketTotalAmount}</span>
                            </p>
                        </div>

                        <div className="checkOutItem">
                            <button type='submit' className="registerSignUp">
                                Place Order
                            </button>

                        </div>
                    </form>
                </div>
            </div>
            <Toaster position='top-left' />
        </div>
    )
}

export default CheckoutModal
