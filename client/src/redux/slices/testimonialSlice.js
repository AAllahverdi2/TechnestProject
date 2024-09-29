import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllTestimonial = createAsyncThunk('getAllTestimonial', async () => {
    const response = await axios.get(`http://localhost:5050/testimonial`)
    return response.data
})
export const postData = createAsyncThunk('postData', async (newData) => {
    const response = await axios.post(`http://localhost:5050/testimonial`, newData)
    return response.data
})

export const getOne = createAsyncThunk('getOne', async (id) => {
    const response = await axios.get(`http://localhost:5050/testimonial/${id}`)
    return response.data
})
export const deleteData = createAsyncThunk('deleteData', async (id) => {
    const response = await axios.delete(`http://localhost:5050/testimonial/${id}`)
    return response.data
})

export const updateData = createAsyncThunk('updateData', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/testimonial/${id}`, newData)
    return response.data
})


const testimonialSlice = createSlice({
    name: "testimonial",
    initialState: {
        testimonial: [],
        originalData: [],
        filteredData: [],
        oneData: {},
        loading: false,
        error: ""
    },
    reducers: {
        searchTestimonial: (state, action) => {
            const searchedTestimonial = action.payload.trim().toLowerCase()
            if (searchedTestimonial == '') {
                state.testimonial = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.userTitle.trim().toLowerCase().includes(searchedTestimonial))
                state.testimonial = [...searching]
            }
        },
        sortTestimonial: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.testimonial = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.userTitle.localeCompare(b.userTitle));
                state.testimonial = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.userTitle.localeCompare(a.userTitle));
                state.testimonial = [...sortZa];
            } else if (sorted === 'a-z') {
                const sortAZ = state.filteredData.sort((a, b) => a.testimonialTitle.localeCompare(b.testimonialTitle));
                state.testimonial = [...sortAZ];
            } else if (sorted === 'z-a') {
                const sortZA = state.filteredData.sort((a, b) => b.testimonialTitle.localeCompare(a.testimonialTitle));
                state.testimonial = [...sortZA];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllTestimonial.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllTestimonial.fulfilled, (state, action) => {
            state.loading = false
            state.testimonial = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllTestimonial.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOne.pending, (state, action) => {
            state.loading = true
        }).addCase(getOne.fulfilled, (state, action) => {
            state.loading = false
            state.oneData = action.payload
        }).addCase(getOne.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteData.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteData.fulfilled, (state, action) => {
            state.loading = false
            state.testimonial = [...state.testimonial.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Testimonial Successfully Deleted")
        }).addCase(deleteData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postData.pending, (state, action) => {
            state.loading = true
        }).addCase(postData.fulfilled, (state, action) => {
            state.loading = false
            state.testimonial.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Testimonial Successfully Added")
        }).addCase(postData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateData.pending, (state, action) => {
            state.loading = true
        }).addCase(updateData.fulfilled, (state, action) => {
            state.loading = false
            state.testimonial = [action.payload, ...state.testimonial.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Testimonial Successfully Updated")
        }).addCase(updateData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchTestimonial, sortTestimonial } = testimonialSlice.actions
export default testimonialSlice.reducer