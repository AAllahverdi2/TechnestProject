import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export const getAllOrders = createAsyncThunk('getAllOrders', async () => {
    const response = await axios.get(`http://localhost:5050/orders`)

    return response.data
})
export const getOneOrder = createAsyncThunk('getOneOrder', async (id) => {
    const response = await axios.get(`http://localhost:5050/orders/${id}`)

    return response.data
})


export const getAllUsersOrders = createAsyncThunk('getAllUsersOrders', async (orderedUserId) => {
    const response = await axios.get(`http://localhost:5050/orders/userOrders/${orderedUserId}`)

    return response.data
})


export const deleteOrder = createAsyncThunk('deleteOrder', async (id) => {
    const response = await axios.delete(`http://localhost:5050/orders/${id}`)

    return response.data
})


export const postOrder = createAsyncThunk('postOrder', async (newData) => {
    const response = await axios.post(`http://localhost:5050/orders`, newData)

    return response.data
})

export const updateOrder = createAsyncThunk('updateOrder', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/orders/${id}`, newData)

    return response.data
})

export const updateOrderStatus = createAsyncThunk('updateOrderStatus', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/orders/orderStatus/${id}`, newData)

    return response.data
})

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        originalData: [],
        filteredData: [],

        oneUserOrders: [],
        filterOneUserOrders: [],
        originalOneUserOrders: [],
        oneOrder: {},
        loading: false,
        error: ""
    },
    reducers: {
        searchOrder: (state, action) => {
            const searchOrders = action.payload.trim().toLowerCase()
            if (searchOrders == '') {
                state.orders = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.orderFirstName.trim().toLowerCase().includes(searchOrders))
                state.orders = [...searching]
            }
        },

        searchOrder2: (state, action) => {
            const searchOrders = action.payload.trim().toLowerCase()
            if (searchOrders == '') {
                state.oneUserOrders = [...state.originalOneUserOrders]
            } else {
                const searching = state.filterOneUserOrders.filter(item => item.orderFirstName.trim().toLowerCase().includes(searchOrders))
                state.oneUserOrders = [...searching]
            }
        },
        sortOrder2: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.oneUserOrders = [...state.originalOneUserOrders];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filterOneUserOrders.sort((a, b) => a.orderFirstName.localeCompare(b.orderFirstName));
                state.oneUserOrders = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filterOneUserOrders.sort((a, b) => b.orderFirstName.localeCompare(a.orderFirstName));
                state.oneUserOrders = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.filterOneUserOrders.sort((a, b) => a.orderTotalPrice - b.orderTotalPrice);
                state.oneUserOrders = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filterOneUserOrders.sort((a, b) => b.orderTotalPrice - a.orderTotalPrice);
                state.oneUserOrders = [...sort90];
            } else if (sorted === 'Pending') {
                const pendingOrders = state.filterOneUserOrders.filter(order => order.orderStatus === 'Pending');
                state.oneUserOrders = [...pendingOrders];
            } else if (sorted === 'Accept') {
                const acceptedOrders = state.filterOneUserOrders.filter(order => order.orderStatus === 'Accept');
                state.oneUserOrders = [...acceptedOrders];

            } else if (sorted === 'Reject') {
                const rejectedOrders = state.filteredData.filter(order => order.orderStatus === 'Reject');
                state.oneUserOrders = [...rejectedOrders];

            }
        },
        sortOrder: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.orders = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.orderFirstName.localeCompare(b.orderFirstName));
                state.orders = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.orderFirstName.localeCompare(a.orderFirstName));
                state.orders = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.filteredData.sort((a, b) => a.orderTotalPrice - b.orderTotalPrice);
                state.orders = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filteredData.sort((a, b) => b.orderTotalPrice - a.orderTotalPrice);
                state.orders = [...sort90];
            } else if (sorted === 'Pending') {
                const pendingOrders = state.filteredData.filter(order => order.orderStatus === 'Pending');
                state.orders = [...pendingOrders];
            } else if (sorted === 'Accept') {
                const acceptedOrders = state.filteredData.filter(order => order.orderStatus === 'Accept');
                state.orders = [...acceptedOrders];

            } else if (sorted === 'Reject') {
                const rejectedOrders = state.filteredData.filter(order => order.orderStatus === 'Reject');
                state.orders = [...rejectedOrders];

            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllUsersOrders.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllUsersOrders.fulfilled, (state, action) => {
            state.loading = false
            state.oneUserOrders = action.payload
            state.filterOneUserOrders = action.payload
            state.originalOneUserOrders = action.payload
        }).addCase(getAllUsersOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneOrder.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneOrder.fulfilled, (state, action) => {
            state.loading = false
            state.oneOrder = action.payload
        }).addCase(getOneOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteOrder.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orders = [...state.orders.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]


            state.oneUserOrders = [...state.oneUserOrders.filter((item) => item._id != action.payload._id)]
            state.filterOneUserOrders = [...state.filterOneUserOrders.filter((item) => item._id != action.payload._id)]
            state.originalOneUserOrders = [...state.originalOneUserOrders.filter((item) => item._id != action.payload._id)]
            toast.success("Order Successfully Deleted")
        }).addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postOrder.pending, (state, action) => {
            state.loading = true
        }).addCase(postOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orders.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            state.oneUserOrders.push(action.payload)
            state.filterOneUserOrders.push(action.payload)
            state.originalOneUserOrders.push(action.payload)
        }).addCase(postOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateOrder.pending, (state, action) => {
            state.loading = true
        }).addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orders = [action.payload, ...state.orders.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]


            state.oneUserOrders = [action.payload, ...state.oneUserOrders.filter(item => item._id != action.payload._id)]
            state.filterOneUserOrders = [action.payload, ...state.filterOneUserOrders.filter(item => item._id != action.payload._id)]
            state.originalOneUserOrders = [action.payload, ...state.originalOneUserOrders.filter(item => item._id != action.payload._id)]
            toast.success("Order Successfully Updated")
        }).addCase(updateOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateOrderStatus.pending, (state, action) => {
            state.loading = true
        }).addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false
            state.orders = [action.payload, ...state.orders.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]


            state.oneUserOrders = [action.payload, ...state.oneUserOrders.filter(item => item._id != action.payload._id)]
            state.filterOneUserOrders = [action.payload, ...state.filterOneUserOrders.filter(item => item._id != action.payload._id)]
            state.originalOneUserOrders = [action.payload, ...state.originalOneUserOrders.filter(item => item._id != action.payload._id)]
            toast.success("Order Status Successfully Updated")
        }).addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchOrder, sortOrder, sortOrder2, searchOrder2 } = ordersSlice.actions
export default ordersSlice.reducer