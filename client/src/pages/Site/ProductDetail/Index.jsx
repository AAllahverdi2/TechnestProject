import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import ProductDetailHeroSection from '../../../components/Site/ProductDetailHeroSection/Index';
import ProductDetailMiddle from '../../../components/Site/ProductDetailMiddle/Index';
import ProductDetailBottomSection from '../../../components/Site/ProductDetailBottomSection/Index';
import { useParams } from 'react-router';
import { getOneProducts } from '../../../redux/slices/producSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductBids } from '../../../redux/slices/bidHistorySlice';
import { useDataContext } from '../../../context/context';
import { useTranslation } from 'react-i18next';
const ProductDetail = () => {

  const { handleCompleteCount } = useDataContext()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { oneProduct, oneProductLoading } = useSelector(state => state.products)
  const { users } = useSelector(state => state.users)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchProduct = async () => {

      try {
        setLoading(true)
        dispatch(getOneProducts(id));
        setLoading(false)

      } catch (e) {

      } finally {
        setLoading(false)
      }
    }
    fetchProduct()

  }, [id, dispatch])
  useEffect(() => {
    if (oneProduct) {
      dispatch(getAllProductBids(id))

    }
  }, [oneProduct?._id, dispatch])
  const { t } = useTranslation()
  return (
    <main className='prodDetail'>
      <Helmet>
        <title>Product Detail</title>
      </Helmet>

      <ProductDetailHeroSection />
      {
        loading ? '' : <ProductDetailMiddle loading={loading} />
      }
      <ProductDetailBottomSection />

    </main >
  )
}

export default ProductDetail
