import { configureStore } from '@reduxjs/toolkit';
import testimonialSlice from './slices/testimonialSlice';
import questionsSlice from './slices/questionsSlice';
import winnersSlice from './slices/winnersSlice';
import managementSlice from './slices/managementSlice';
import userSlice from './slices/userSlice';
import producSlice from './slices/producSlice';
import bidHistorySlice from './slices/bidHistorySlice';
import winningProductSlice from './slices/winningProductSlice';
import subscribersSlice from './slices/subscribersSlice';
import orderSlice from './slices/orderSlice';
import blogSlice from './slices/blogSlice';
import commentSlice from './slices/commentSlice';
import todoSlice from './slices/todoSlice';
const store = configureStore({
    reducer: {
        testimonial: testimonialSlice,
        questions: questionsSlice,
        winners: winnersSlice,
        management: managementSlice,
        users: userSlice,
        products: producSlice,
        bidHistory: bidHistorySlice,
        winningProducts: winningProductSlice,
        subscribers: subscribersSlice,
        orders: orderSlice,
        blogs: blogSlice,
        comments: commentSlice,
        todo: todoSlice
    }
})


export default store