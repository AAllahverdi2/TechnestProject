import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export const getAllSubscribers = createAsyncThunk('getAllSubscribers', async () => {
    const response = await axios.get(`http://localhost:5050/subscribers`)
    return response.data
})
export const postSubscribers = createAsyncThunk('postSubscribers', async (newData) => {
    const response = await axios.post(`http://localhost:5050/subscribers`, newData)
    return response.data
})

export const getOneSubscribers = createAsyncThunk('getOneSubscribers', async (id) => {
    const response = await axios.get(`http://localhost:5050/subscribers/${id}`)
    return response.data
})
export const deleteSubscribers = createAsyncThunk('deleteSubscribers', async (id) => {
    const response = await axios.delete(`http://localhost:5050/subscribers/${id}`)
    return response.data
})

const subscribersSlice = createSlice({
    name: 'subscribers',
    initialState: {
        subscribers: [],
        originalData: [],
        filteredData: [],
        oneSubscriber: {},
        loading: false,
        error: ''
    },
    reducers: {
        searchSubscribers: (state, action) => {
            const searchedSubscribers = action.payload.trim().toLowerCase()
            if (searchedSubscribers == '') {
                state.subscribers = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.subscriberGmail.trim().toLowerCase().includes(searchedSubscribers))
                state.subscribers = [...searching]
            }
        },
        sortSubscribers: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.subscribers = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.subscriberGmail.localeCompare(b.subscriberGmail));
                state.subscribers = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.subscriberGmail.localeCompare(a.subscriberGmail));
                state.subscribers = [...sortZa];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSubscribers.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllSubscribers.fulfilled, (state, action) => {
            state.loading = false
            state.subscribers = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllSubscribers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneSubscribers.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneSubscribers.fulfilled, (state, action) => {
            state.loading = false
            state.oneSubscriber = action.payload
        }).addCase(getOneSubscribers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteSubscribers.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteSubscribers.fulfilled, (state, action) => {
            state.loading = false
            state.subscribers = [...state.subscribers.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Subscriber Successfully Deleted")
        }).addCase(deleteSubscribers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postSubscribers.pending, (state, action) => {
            state.loading = true
        }).addCase(postSubscribers.fulfilled, (state, action) => {
            state.loading = false
            state.subscribers.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
        }).addCase(postSubscribers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



    }
})


export const { searchSubscribers, sortSubscribers } = subscribersSlice.actions
export default subscribersSlice.reducer