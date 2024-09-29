import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllWinners = createAsyncThunk('getAllWinners', async () => {
    const response = await axios.get(`http://localhost:5050/winners`)
    return response.data
})
export const postWinner = createAsyncThunk('postWinner', async (newData) => {
    const response = await axios.post(`http://localhost:5050/winners`, newData)
    return response.data
})

export const getOneWinner = createAsyncThunk('getOneWinner', async (id) => {
    const response = await axios.get(`http://localhost:5050/winners/${id}`)
    return response.data
})
export const deleteWinner = createAsyncThunk('deleteWinner', async (id) => {
    const response = await axios.delete(`http://localhost:5050/winners/${id}`)
    return response.data
})

export const updateWinner = createAsyncThunk('updateWinner', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/winners/${id}`, newData)
    return response.data
})


const winnerSlice = createSlice({
    name: "winners",
    initialState: {
        winners: [],
        originalData: [],
        filteredData: [],
        oneWinner: {},
        winnerLoading: false,
        error: ""
    },
    reducers: {
        searchWinner: (state, action) => {
            const searchedWinner = action.payload.trim().toLowerCase()
            if (searchedWinner == '') {
                state.winners = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.winnerTitle.trim().toLowerCase().includes(searchedWinner))
                state.winners = [...searching]
            }
        },
        sortWinner: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.winners = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.winnerTitle.localeCompare(b.winnerTitle));
                state.winners = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.winnerTitle.localeCompare(a.winnerTitle));
                state.winners = [...sortZa];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllWinners.pending, (state, action) => {
            state.winnerLoading = true
        }).addCase(getAllWinners.fulfilled, (state, action) => {
            state.winnerLoading = false
            state.winners = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllWinners.rejected, (state, action) => {
            state.winnerLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneWinner.pending, (state, action) => {
            state.winnerLoading = true
        }).addCase(getOneWinner.fulfilled, (state, action) => {
            state.winnerLoading = false
            state.oneWinner = action.payload
        }).addCase(getOneWinner.rejected, (state, action) => {
            state.winnerLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteWinner.pending, (state, action) => {
            state.winnerLoading = true
        }).addCase(deleteWinner.fulfilled, (state, action) => {
            state.winnerLoading = false
            state.winners = [...state.winners.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Winner Successfully Deleted")
        }).addCase(deleteWinner.rejected, (state, action) => {
            state.winnerLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postWinner.pending, (state, action) => {
            state.winnerLoading = true
        }).addCase(postWinner.fulfilled, (state, action) => {
            state.winnerLoading = false
            state.winners.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Winner Successfully Added")
        }).addCase(postWinner.rejected, (state, action) => {
            state.winnerLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateWinner.pending, (state, action) => {
            state.winnerLoading = true
        }).addCase(updateWinner.fulfilled, (state, action) => {
            state.winnerLoading = false
            state.winners = [action.payload, ...state.winners.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Winner Successfully Updated")
        }).addCase(updateWinner.rejected, (state, action) => {
            state.winnerLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchWinner, sortWinner } = winnerSlice.actions
export default winnerSlice.reducer