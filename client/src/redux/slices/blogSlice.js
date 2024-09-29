import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


export const getAllBlogs = createAsyncThunk('getAllBlogs', async () => {
    const response = await axios.get(`http://localhost:5050/blogs`)
    return response.data
})

export const getOneBlog = createAsyncThunk('getOneBlog', async (id) => {
    const response = await axios.get(`http://localhost:5050/blogs/${id}`)

    return response.data
})


export const getAllUsersBlogs = createAsyncThunk('getAllUsersBlogs', async (posterId) => {
    const response = await axios.get(`http://localhost:5050/blogs/userProduct/${posterId}`)

    return response.data
})


export const deleteBlog = createAsyncThunk('deleteBlog', async (id) => {
    const response = await axios.delete(`http://localhost:5050/blogs/${id}`)
    return response.data
})


export const postBlog = createAsyncThunk('postBlog', async (newData) => {
    const response = await axios.post(`http://localhost:5050/blogs`, newData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
})

export const updateBlog = createAsyncThunk('updateBlog', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/blogs/${id}`, newData)
    return response.data
})

export const updateBlogWatchers = createAsyncThunk('updateBlogWatchers', async (id) => {
    const response = await axios.put(`http://localhost:5050/blogs/watchers/${id}`)
    return response.data
})


const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        originalBlogs: [],
        filteringBlogs: [],
        oneUserAllBlogs: [],
        oneUserAllOriginalBlogs: [],
        oneUserAllFilteringBlogs: [],

        oneBlog: {},
        error: '',
        loading: false
    },
    reducers: {
        searchBlog: (state, action) => {
            const searchedBlogs = action.payload.trim().toLowerCase()
            if (searchedBlogs == '') {
                state.blogs = [...state.originalBlogs]
            } else {
                const searching = state.filteringBlogs.filter(item => item.blogTitle2.trim().toLowerCase().includes(searchedBlogs))
                state.blogs = [...searching]
            }
        },

        sortBlogs: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.blogs = [...state.originalBlogs];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteringBlogs.sort((a, b) => a.posterName.localeCompare(b.posterName));
                state.blogs = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteringBlogs.sort((a, b) => b.posterName.localeCompare(a.posterName));
                state.blogs = [...sortZa];
            } else if (sorted === 'a-z') {
                const sortAZ = state.filteringBlogs.sort((a, b) => a.blogTitle2.localeCompare(b.blogTitle2));
                state.blogs = [...sortAZ];
            } else if (sorted === 'z-a') {
                const sortZA = state.filteringBlogs.sort((a, b) => b.blogTitle2.localeCompare(a.blogTitle2));
                state.blogs = [...sortZA];
            } else if (sorted === '0-9') {
                const sort09 = state.filteringBlogs.sort((a, b) => a.watchers - b.watchers);
                state.blogs = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filteringBlogs.sort((a, b) => b.watchers - a.watchers);
                state.blogs = [...sort90];
            } else if (sorted === 'NO') {
                const sortON = state.filteringBlogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                state.blogs = [...sortON];
            } else if (sorted === 'ON') {
                const sortNO = state.filteringBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                state.blogs = [...sortNO];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBlogs.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.blogs = action.payload
            state.originalBlogs = action.payload
            state.filteringBlogs = action.payload
        }).addCase(getAllBlogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllUsersBlogs.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllUsersBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.oneUserAllBlogs = action.payload
            state.oneUserAllOriginalBlogs = action.payload
            state.oneUserAllFilteringBlogs = action.payload
        }).addCase(getAllUsersBlogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneBlog.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneBlog.fulfilled, (state, action) => {
            state.loading = false
            state.oneBlog = action.payload
        }).addCase(getOneBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteBlog.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteBlog.fulfilled, (state, action) => {
            state.loading = false
            state.blogs = [...state.blogs.filter((item) => item._id != action.payload._id)]
            state.originalBlogs = [...state.originalBlogs.filter((item) => item._id != action.payload._id)]
            state.filteringBlogs = [...state.filteringBlogs.filter((item) => item._id != action.payload._id)]

            state.oneUserAllBlogs = [...state.oneUserAllBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllOriginalBlogs = [...state.oneUserAllOriginalBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllFilteringBlogs = [...state.oneUserAllFilteringBlogs.filter((item) => item._id != action.payload._id)]
        }).addCase(deleteBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postBlog.pending, (state, action) => {
            state.loading = true
        }).addCase(postBlog.fulfilled, (state, action) => {
            state.loading = false
            state.blogs.push(action.payload)
            state.originalBlogs.push(action.payload)
            state.filteringBlogs.push(action.payload)
            state.oneUserAllBlogs.push(action.payload)
            state.oneUserAllFilteringBlogs.push(action.payload)
            state.oneUserAllOriginalBlogs.push(action.payload)

        }).addCase(postBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateBlog.pending, (state, action) => {
            state.loading = true
        }).addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false

            state.blogs = [action.payload, ...state.blogs.filter((item) => item._id != action.payload._id)]
            state.originalBlogs = [action.payload, ...state.originalBlogs.filter((item) => item._id != action.payload._id)]
            state.filteringBlogs = [action.payload, ...state.filteringBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllBlogs = [action.payload, ...state.oneUserAllBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllFilteringBlogs = [action.payload, ...state.oneUserAllFilteringBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllOriginalBlogs = [action.payload, ...state.oneUserAllOriginalBlogs.filter((item) => item._id != action.payload._id)]

        }).addCase(updateBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(updateBlogWatchers.pending, (state, action) => {
            state.loading = true
        }).addCase(updateBlogWatchers.fulfilled, (state, action) => {
            state.loading = false

            state.blogs = [action.payload, ...state.blogs.filter((item) => item._id != action.payload._id)]
            state.originalBlogs = [action.payload, ...state.originalBlogs.filter((item) => item._id != action.payload._id)]
            state.filteringBlogs = [action.payload, ...state.filteringBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllBlogs = [action.payload, ...state.oneUserAllBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllFilteringBlogs = [action.payload, ...state.oneUserAllFilteringBlogs.filter((item) => item._id != action.payload._id)]
            state.oneUserAllOriginalBlogs = [action.payload, ...state.oneUserAllOriginalBlogs.filter((item) => item._id != action.payload._id)]

        }).addCase(updateBlogWatchers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})



export const { sortBlogs, searchBlog } = blogSlice.actions

export default blogSlice.reducer