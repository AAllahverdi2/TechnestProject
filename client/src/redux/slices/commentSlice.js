import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


export const getAllComments = createAsyncThunk('getAllComments', async () => {
    const response = await axios.get(`http://localhost:5050/comments`)
    return response.data
})

export const getOneComment = createAsyncThunk('getOneComment', async (id) => {
    const response = await axios.get(`http://localhost:5050/comments/${id}`)

    return response.data
})

export const getAllBlogsComment = createAsyncThunk('getAllBlogsComment', async (blogId) => {
    const response = await axios.get(`http://localhost:5050/comments/blogsComments/${blogId}`)

    return response.data
})


export const deleteComment = createAsyncThunk('deleteComment', async (id) => {
    const response = await axios.delete(`http://localhost:5050/comments/${id}`)
    return response.data
})


export const postComment = createAsyncThunk('postComment', async (newData) => {
    const response = await axios.post(`http://localhost:5050/comments`, newData)
    return response.data
})

export const updateComment = createAsyncThunk('updateComment', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/comments/${id}`, newData)
    return response.data
})



const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        originalComments: [],
        filteringComments: [],
        oneBlogAllComments: [],
        oneBlogOriginalComments: [],
        oneBlogAllFilteringComment: [],

        oneComment: {},
        error: '',
        loading: false
    },
    reducers: {
        searchComment: (state, action) => {
            const searchCom = action.payload.trim().toLowerCase()
            if (searchCom == '') {
                state.comments = [...state.originalComments]
            } else {
                const searching = state.filteringComments.filter(item => item.commentedName.trim().toLowerCase().includes(searchCom))
                state.comments = [...searching]
            }
        },

        sortComments: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.comments = [...state.originalComments];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteringComments.sort((a, b) => a.commentedName.localeCompare(b.commentedName));
                state.comments = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteringComments.sort((a, b) => b.commentedName.localeCompare(a.commentedName));
                state.comments = [...sortZa];
            } else if (sorted === 'NO') {
                const sortON = state.filteringComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                state.comments = [...sortON];
            } else if (sorted === 'ON') {
                const sortNO = state.filteringComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                state.comments = [...sortNO];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllComments.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllComments.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload
            state.originalComments = action.payload
            state.filteringComments = action.payload
        }).addCase(getAllComments.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllBlogsComment.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllBlogsComment.fulfilled, (state, action) => {
            state.loading = false
            state.oneBlogAllComments = action.payload
            state.oneBlogOriginalComments = action.payload
            state.oneBlogAllFilteringComment = action.payload
        }).addCase(getAllBlogsComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneComment.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneComment.fulfilled, (state, action) => {
            state.loading = false
            state.oneComment = action.payload
        }).addCase(getOneComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteComment.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false
            state.comments = [...state.comments.filter((item) => item._id != action.payload._id)]
            state.originalComments = [...state.originalComments.filter((item) => item._id != action.payload._id)]
            state.filteringComments = [...state.filteringComments.filter((item) => item._id != action.payload._id)]

            state.oneBlogAllComments = [...state.oneBlogAllComments.filter((item) => item._id != action.payload._id)]
            state.oneBlogAllFilteringComment = [...state.oneBlogAllFilteringComment.filter((item) => item._id != action.payload._id)]
            state.oneBlogOriginalComments = [...state.oneBlogOriginalComments.filter((item) => item._id != action.payload._id)]
        }).addCase(deleteComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postComment.pending, (state, action) => {
            state.loading = true
        }).addCase(postComment.fulfilled, (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
            state.originalComments.push(action.payload)
            state.filteringComments.push(action.payload)
            state.oneBlogAllComments.push(action.payload)
            state.oneBlogAllFilteringComment.push(action.payload)
            state.oneBlogOriginalComments.push(action.payload)

        }).addCase(postComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateComment.pending, (state, action) => {
            state.loading = true
        }).addCase(updateComment.fulfilled, (state, action) => {
            state.loading = false

            state.comments = [action.payload, ...state.comments.filter((item) => item._id != action.payload._id)]
            state.originalComments = [action.payload, ...state.originalComments.filter((item) => item._id != action.payload._id)]
            state.filteringComments = [action.payload, ...state.filteringComments.filter((item) => item._id != action.payload._id)]
            state.oneBlogAllComments = [action.payload, ...state.oneBlogAllComments.filter((item) => item._id != action.payload._id)]
            state.oneBlogAllFilteringComment = [action.payload, ...state.oneBlogAllFilteringComment.filter((item) => item._id != action.payload._id)]
            state.oneBlogOriginalComments = [action.payload, ...state.oneBlogOriginalComments.filter((item) => item._id != action.payload._id)]

        }).addCase(updateComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



    }
})



export const { searchComment, sortComments } = commentSlice.actions

export default commentSlice.reducer