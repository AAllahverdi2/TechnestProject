import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllBidHistory = createAsyncThunk('getAllBidHistory', async () => {
    const response = await axios.get(`http://localhost:5050/bidHistory`)
    return response.data
})
export const postBids = createAsyncThunk('postBids', async (newData) => {
    const response = await axios.post(`http://localhost:5050/bidHistory`, newData)
    return response.data
})

export const getOneBids = createAsyncThunk('getOneBids', async (id) => {
    const response = await axios.get(`http://localhost:5050/bidHistory/${id}`)
    return response.data
})

export const getAllProductBids = createAsyncThunk('getAllProductBids', async (prodId) => {
    const response = await axios.get(`http://localhost:5050/bidHistory/product/${prodId}`)
    return response.data
})

export const deleteBid = createAsyncThunk('deleteBid', async (id) => {
    const response = await axios.delete(`http://localhost:5050/bidHistory/${id}`)
    return response.data
})



const bidHistorySlice = createSlice({
    name: "bidHistory",
    initialState: {
        bidHistory: [],
        bidHistoryOriginalData: [],
        bidHistoryFilteredData: [],
        productsBidHistory: [],
        oneBidHistory: {},
        loading: false,
        error: ""
    },
    reducers: {
        searchBidders: (state, action) => {
            const searchedBidders = action.payload.trim().toLowerCase()
            if (searchedBidders == '') {
                state.bidHistory = [...state.bidHistoryOriginalData]
            } else {
                const searching = state.bidHistoryFilteredData.filter(item => item.bidderName.trim().toLowerCase().includes(searchedBidders))
                state.bidHistory = [...searching]
            }
        },
        sortBidders: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.bidHistory = [...state.bidHistoryOriginalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.bidHistoryFilteredData.sort((a, b) => a.bidderName.localeCompare(b.bidderName));
                state.bidHistory = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.bidHistoryFilteredData.sort((a, b) => b.bidderName.localeCompare(a.bidderName));
                state.bidHistory = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.bidHistoryFilteredData.sort((a, b) => a.productBidPrice - b.productBidPrice);
                state.bidHistory = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.bidHistoryFilteredData.sort((a, b) => b.productBidPrice - a.productBidPrice);
                state.bidHistory = [...sort90];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBidHistory.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllBidHistory.fulfilled, (state, action) => {
            state.loading = false
            state.bidHistory = action.payload
            state.bidHistoryFilteredData = action.payload
            state.bidHistoryOriginalData = action.payload
        }).addCase(getAllBidHistory.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllProductBids.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllProductBids.fulfilled, (state, action) => {
            state.loading = false
            state.productsBidHistory = action.payload
        }).addCase(getAllProductBids.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getOneBids.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneBids.fulfilled, (state, action) => {
            state.loading = false
            state.oneBidHistory = action.payload
        }).addCase(getOneBids.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteBid.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteBid.fulfilled, (state, action) => {
            state.loading = false
            state.bidHistory = [...state.bidHistory.filter((item) => item._id != action.payload._id)]
            state.bidHistoryFilteredData = [...state.bidHistoryFilteredData.filter((item) => item._id != action.payload._id)]
            state.bidHistoryOriginalData = [...state.bidHistoryOriginalData.filter((item) => item._id != action.payload._id)]
            state.productsBidHistory = [...state.productsBidHistory.filter((item) => item._id != action.payload._id)]
            toast.success("Bids Deleted Successfully Deleted")
        }).addCase(deleteBid.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postBids.pending, (state, action) => {
            state.loading = true
        }).addCase(postBids.fulfilled, (state, action) => {
            state.loading = false
            state.bidHistory.push(action.payload)
            state.bidHistoryFilteredData.push(action.payload)
            state.bidHistoryOriginalData.push(action.payload)
            state.productsBidHistory.push(action.payload)
        }).addCase(postBids.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


    }
})
export const { searchBidders, sortBidders } = bidHistorySlice.actions
export default bidHistorySlice.reducer