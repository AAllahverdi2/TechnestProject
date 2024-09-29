import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useDataContext } from '../../../context/context';
import { getOneWinningProducts } from '../../../redux/slices/winningProductSlice';
import WinningProductDetailHero from '../../../components/Site/WinningProductDetailHero/Index';
import WinningProductDetailBottom from '../../../components/Site/WinningProductDetailBottom/Index';
import WinningProductDetailMiddle from '../../../components/Site/WinningProductDetailMiddle/Index';
const WinningProductDetail = () => {
  const { handleCompleteCount } = useDataContext()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { oneWinningProduct } = useSelector(state => state.winningProducts)
  const { users } = useSelector(state => state.users)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchProduct = async () => {

      try {
        setLoading(true)
        dispatch(getOneWinningProducts(id));
        setLoading(false)

      } catch (e) {

      } finally {
        setLoading(false)
      }
    }
    fetchProduct()

  }, [id, dispatch])

  return (
    <main className='prodDetail'>
      <Helmet>
        <title>Winning Product Detail</title>
      </Helmet>
      <WinningProductDetailHero />
      {
        loading ? '' : <WinningProductDetailMiddle loading={loading} />
      }
    
      <WinningProductDetailBottom />
    </main >
  )
}

export default WinningProductDetail
