import React from 'react'
import './Index.scss'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersOrders } from '../../../../redux/slices/orderSlice';
import { useTranslation } from 'react-i18next';
const AcceptModal = () => {
    const { userToken } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    return (
        <div className='success'>
            <div className="checkOutFormBox">
                <Result
                    style={{ color: 'white' }}

                    status="success"
                    title={t('pages.acceptModal.title')}
                    subTitle={t('pages.acceptModal.subTitle')}
                    extra={[
                        <Link className='byAgainBtn' to="/product" key="product">
                            <button >    {
                                t('pages.acceptModal.btn1')
                            }</button>
                        </Link>,

                        <Link onClick={async () => {
                            await dispatch(getAllUsersOrders(userToken?.id))

                        }} key="order" to={'/myOrders'} className='orderBtn'>
                            <button  >{
                                t('pages.acceptModal.btn2')}</button>
                        </Link>,
                    ]}
                />
            </div>
        </div>
    )
}

export default AcceptModal
