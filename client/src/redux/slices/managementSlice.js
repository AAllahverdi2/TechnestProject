import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllManagement = createAsyncThunk('getAllManagement', async () => {
    const response = await axios.get(`http://localhost:5050/management`)
    return response.data
})
export const postManagement = createAsyncThunk('postManagement', async (newData) => {
    const response = await axios.post(`http://localhost:5050/management`, newData)
    return response.data
})

export const getOneManagement = createAsyncThunk('getOneManagement', async (id) => {
    const response = await axios.get(`http://localhost:5050/management/${id}`)
    return response.data
})
export const deleteManagement = createAsyncThunk('deleteManagement', async (id) => {
    const response = await axios.delete(`http://localhost:5050/management/${id}`)
    return response.data
})

export const updateManagement = createAsyncThunk('updateManagement', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/management/${id}`, newData)
    return response.data
})


const managementSlice = createSlice({
    name: "management",
    initialState: {
        management: [],
        originalData: [],
        filteredData: [],
        oneManagement: {},
        managementLoading: false,
        error: ""
    },
    reducers: {
        searchManagement: (state, action) => {
            const searchedManagement = action.payload.trim().toLowerCase()
            if (searchedManagement == '') {
                state.management = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.managementTitle.trim().toLowerCase().includes(searchedManagement))
                state.management = [...searching]
            }
        },
        sortManagement: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.management = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.managementTitle.localeCompare(b.managementTitle));
                state.management = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.managementTitle.localeCompare(a.managementTitle));
                state.management = [...sortZa];
            } else if (sorted === 'a-z') {
                const sortAZ = state.filteredData.sort((a, b) => a.managementProfession.localeCompare(b.managementProfession));
                state.management = [...sortAZ];
            } else if (sorted === 'z-a') {
                const sortZA = state.filteredData.sort((a, b) => b.managementProfession.localeCompare(a.managementProfession));
                state.management = [...sortZA];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllManagement.pending, (state, action) => {
            state.managementLoading = true
        }).addCase(getAllManagement.fulfilled, (state, action) => {
            state.managementLoading = false
            state.management = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllManagement.rejected, (state, action) => {
            state.managementLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneManagement.pending, (state, action) => {
            state.managementLoading = true
        }).addCase(getOneManagement.fulfilled, (state, action) => {
            state.managementLoading = false
            state.oneManagement = action.payload
        }).addCase(getOneManagement.rejected, (state, action) => {
            state.managementLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteManagement.pending, (state, action) => {
            state.managementLoading = true
        }).addCase(deleteManagement.fulfilled, (state, action) => {
            state.managementLoading = false
            state.management = [...state.management.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Management Successfully Deleted")
        }).addCase(deleteManagement.rejected, (state, action) => {
            state.managementLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postManagement.pending, (state, action) => {
            state.managementLoading = true
        }).addCase(postManagement.fulfilled, (state, action) => {
            state.managementLoading = false
            state.management.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Management Successfully Added")
        }).addCase(postManagement.rejected, (state, action) => {
            state.managementLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateManagement.pending, (state, action) => {
            state.managementLoading = true
        }).addCase(updateManagement.fulfilled, (state, action) => {
            state.managementLoading = false
            state.management = [action.payload, ...state.management.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Management Successfully Updated")
        }).addCase(updateManagement.rejected, (state, action) => {
            state.managementLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchManagement, sortManagement } = managementSlice.actions
export default managementSlice.reducer