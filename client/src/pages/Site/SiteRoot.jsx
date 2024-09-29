import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Header from '../../layout/Site/Header/Index';
import Footer from '../../layout/Site/Footer/Index';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTestimonial } from '../../redux/slices/testimonialSlice';
import { getAllQuestions } from '../../redux/slices/questionsSlice';
import { getAllWinners } from '../../redux/slices/winnersSlice';
import { getAllManagement } from '../../redux/slices/managementSlice';
import { editUser, getAllUsers, getUserToken, logOut } from '../../redux/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast'
import { getAllBiddersProducts, getAllProducts, getAllUserProducts } from '../../redux/slices/producSlice';
import { getAllBidHistory } from '../../redux/slices/bidHistorySlice';
import { getAllUserWinningProduct, getAllWinningProducts } from '../../redux/slices/winningProductSlice';
import { getAllSubscribers } from '../../redux/slices/subscribersSlice';
import { getAllOrders, getAllUsersOrders } from '../../redux/slices/orderSlice';
import { getAllBlogs, getAllUsersBlogs } from '../../redux/slices/blogSlice';
import { getAllComments } from '../../redux/slices/commentSlice';
import { getAllTodos, getAllUserTodo } from '../../redux/slices/todoSlice';

const SiteRoot = () => {
    const { userToken } = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllTestimonial())
        dispatch(getAllQuestions())
        dispatch(getAllWinners())
        dispatch(getAllManagement())
        dispatch(getAllUsers())
        dispatch(getAllProducts())
        dispatch(getAllBidHistory())
        dispatch(getAllWinningProducts())
        dispatch(getAllSubscribers())
        dispatch(getAllOrders())
        dispatch(getAllBlogs())
        dispatch(getAllComments())
        dispatch(getAllTodos())
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decode = jwtDecode(token)
            dispatch(getAllUserProducts(decode.id))
            dispatch(getAllBiddersProducts(decode.id))
            dispatch(getAllUserWinningProduct(decode.id))
            dispatch(getAllUsersOrders(decode.id))
            dispatch(getAllUsersBlogs(decode.id))
            dispatch(getAllUserTodo(decode.id))

            dispatch(getUserToken())
        }

    }, [dispatch])



    const navigate = useNavigate()
    const tokenEnd = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return true
        }
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000)
        return decodedToken.exp < currentTime;
    }

    const handleTokenExpiration = async () => {
        const token = localStorage.getItem('token')

        if (tokenEnd()) {
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    await dispatch(editUser({ id: userId, newData: { status: false, isLogin: false } }));
                    await dispatch(logOut());
                    toast.error('Token expired, please log in again', { icon: '🔒' });
                    navigate('/');
                }

            } catch (error) {
                console.error('Error handling token expiration:', error);
            }
        }
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
            handleTokenExpiration();
        }, 10 * 60 * 1000);
        handleTokenExpiration()

        return () => clearInterval(intervalId);
    }, [])


    return (
        <React.Fragment>

            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    )
}

export default SiteRoot
