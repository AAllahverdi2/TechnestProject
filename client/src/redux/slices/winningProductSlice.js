import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllWinningProducts = createAsyncThunk('getAllWinningProducts', async () => {
    const response = await axios.get(`http://localhost:5050/winningProduct`)
    return response.data
})
export const postWinningProducts = createAsyncThunk('postWinningProducts', async (newData) => {
    const response = await axios.post(`http://localhost:5050/winningProduct`, newData)
    return response.data
})

export const getOneWinningProducts = createAsyncThunk('getOneWinningProducts', async (id) => {
    const response = await axios.get(`http://localhost:5050/winningProduct/${id}`)
    return response.data
})
export const deleteWinningProduct = createAsyncThunk('deleteWinningProduct', async (id) => {
    const response = await axios.delete(`http://localhost:5050/winningProduct/${id}`)
    return response.data
})

export const getAllUserWinningProduct = createAsyncThunk('getAllUserWinningProduct', async (winnerId) => {
    const response = await axios.get(`http://localhost:5050/winningProduct/userWinningProducts/${winnerId}`)
    return response.data
})

export const updateWinningProduct = createAsyncThunk('updateWinningProduct', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/winningProduct/${id}`, newData)
    return response.data
})


const winningProductSlice = createSlice({
    name: "winningProduct",
    initialState: {
        winningProduct: [],
        originalData: [],
        filteredData: [],
        userWinningProducts: [],
        filterUserWinningProducts: [],
        originalUserWinningProducts: [],
        oneWinningProduct: {},
        loading: false,
        error: ""
    },
    reducers: {
        searchWinningProduct: (state, action) => {
            const searchedWinningProduct = action.payload.trim().toLowerCase()
            if (searchedWinningProduct == '') {
                state.userWinningProducts = [...state.originalUserWinningProducts]
            } else {
                const searching = state.filterUserWinningProducts.filter(item => item.product[0].productName.trim().toLowerCase().includes(searchedWinningProduct));
                state.userWinningProducts = [...searching]
            }
        },

        searchWinningProduct2: (state, action) => {
            const searchedWinningProduct = action.payload.trim().toLowerCase()
            if (searchedWinningProduct == '') {
                state.winningProduct = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.winnerName.trim().toLowerCase().includes(searchedWinningProduct));
                state.winningProduct = [...searching]
            }
        },

        sortProducts: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.userWinningProducts = [...state.originalUserWinningProducts];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filterUserWinningProducts.sort((a, b) => a.product[0].productName.localeCompare(b.product[0].productName));
                state.userWinningProducts = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filterUserWinningProducts.sort((a, b) => b.product[0].productName.localeCompare(a.product[0].productName));
                state.userWinningProducts = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.filterUserWinningProducts.sort((a, b) => a.product[0].afterPrice - b.product[0].afterPrice);
                state.userWinningProducts = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filterUserWinningProducts.sort((a, b) => b.product[0].afterPrice - a.product[0].afterPrice);
                state.userWinningProducts = [...sort90];
            } else if (sorted == 'Electronic') {
                const filterElectronic = state.filterUserWinningProducts.filter(item => item.product[0].type == 'electronic');
                state.userWinningProducts = [...filterElectronic];
            } else if (sorted == 'Jewelry') {
                const filterJewelry = state.filterUserWinningProducts.filter(item => item.product[0].type == 'jewelry');
                state.userWinningProducts = [...filterJewelry];
            } else if (sorted == 'Car') {
                const filterCar = state.filterUserWinningProducts.filter(item => item.product[0].type == 'car');
                state.userWinningProducts = [...filterCar];
            } else if (sorted == 'Latest') {
                const filterCreated = state.filterUserWinningProducts.sort((a, b) => new Date(b.product[0].createdAt) - new Date(a.product[0].createdAt));
                state.userWinningProducts = [...filterCreated];
            } else if (sorted == 'Oldest') {
                const filterCreated2 = state.filterUserWinningProducts.sort((a, b) => new Date(a.product[0].createdAt) - new Date(b.product[0].createdAt));
                state.userWinningProducts = [...filterCreated2];
            } else if (sorted === 'EndingSoon') {
                const filterEndingSoon = state.filterUserWinningProducts.sort((a, b) => {
                    const timeLeftA = new Date(a.product[0].endTime) - new Date();
                    const timeLeftB = new Date(b.product[0].endTime) - new Date();
                    return timeLeftA - timeLeftB;
                });
                state.userWinningProducts = [...filterEndingSoon];
            } else if (sorted === 'EndingLater') {
                const filterEndingLater = state.filterUserWinningProducts.sort((a, b) => {
                    const timeLeftA = new Date(a.product[0].endTime) - new Date();
                    const timeLeftB = new Date(b.product[0].endTime) - new Date();
                    return timeLeftB - timeLeftA;
                });
                state.userWinningProducts = [...filterEndingLater];
            }
        }
        ,
        sortProducts2: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.winningProduct = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.product[0].productName.localeCompare(b.product[0].productName));
                state.winningProduct = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.product[0].productName.localeCompare(a.product[0].productName));
                state.winningProduct = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.filteredData.sort((a, b) => a.product[0].afterPrice - b.product[0].afterPrice);
                state.winningProduct = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filteredData.sort((a, b) => b.product[0].afterPrice - a.product[0].afterPrice);
                state.winningProduct = [...sort90];
            } else if (sorted == 'Electronic') {
                const filterElectronic = state.filteredData.filter(item => item.product[0].type == 'electronic');
                state.winningProduct = [...filterElectronic];
            } else if (sorted == 'Jewelry') {
                const filterJewelry = state.filteredData.filter(item => item.product[0].type == 'jewelry');
                state.winningProduct = [...filterJewelry];
            } else if (sorted == 'Car') {
                const filterCar = state.filteredData.filter(item => item.product[0].type == 'car');
                state.winningProduct = [...filterCar];
            } 
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllWinningProducts.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllWinningProducts.fulfilled, (state, action) => {
            state.loading = false
            state.winningProduct = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllWinningProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllUserWinningProduct.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllUserWinningProduct.fulfilled, (state, action) => {
            state.loading = false
            state.userWinningProducts = action.payload
            state.originalUserWinningProducts = action.payload
            state.filterUserWinningProducts = action.payload
        }).addCase(getAllUserWinningProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })
        builder.addCase(getOneWinningProducts.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneWinningProducts.fulfilled, (state, action) => {
            state.loading = false
            state.oneWinningProduct = action.payload
        }).addCase(getOneWinningProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteWinningProduct.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteWinningProduct.fulfilled, (state, action) => {
            state.loading = false
            state.winningProduct = [...state.winningProduct.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]

            state.userWinningProducts = [...state.userWinningProducts.filter((item) => item._id != action.payload._id)]
            state.filterUserWinningProducts = [...state.filterUserWinningProducts.filter((item) => item._id != action.payload._id)]
            state.originalUserWinningProducts = [...state.originalUserWinningProducts.filter((item) => item._id != action.payload._id)]
        }).addCase(deleteWinningProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postWinningProducts.pending, (state, action) => {
            state.loading = true
        }).addCase(postWinningProducts.fulfilled, (state, action) => {
            state.loading = false
            state.winningProduct.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)

            state.userWinningProducts.push(action.payload)
            state.filterUserWinningProducts.push(action.payload)
            state.originalUserWinningProducts.push(action.payload)
        }).addCase(postWinningProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })



        builder.addCase(updateWinningProduct.pending, (state, action) => {
            state.loading = true
        }).addCase(updateWinningProduct.fulfilled, (state, action) => {
            state.loading = false
            state.winningProduct = [action.payload, ...state.winningProduct.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]

            state.userWinningProducts = [action.payload, ...state.userWinningProducts.filter(item => item._id != action.payload._id)]
            state.filterUserWinningProducts = [action.payload, ...state.filterUserWinningProducts.filter(item => item._id != action.payload._id)]
            state.originalUserWinningProducts = [action.payload, ...state.originalUserWinningProducts.filter(item => item._id != action.payload._id)]
            toast.success("winningProduct Successfully Updated")
        }).addCase(updateWinningProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchWinningProduct, sortProducts, searchWinningProduct2 ,sortProducts2} = winningProductSlice.actions
export default winningProductSlice.reducer