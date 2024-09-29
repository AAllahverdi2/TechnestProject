import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllTodos = createAsyncThunk('getAllTodos', async () => {
    const response = await axios.get(`http://localhost:5050/todo`)
    return response.data
})
export const postTodo = createAsyncThunk('postTodo', async (newData) => {
    const response = await axios.post(`http://localhost:5050/todo`, newData)
    return response.data
})

export const getOneTodo = createAsyncThunk('getOneTodo', async (id) => {
    const response = await axios.get(`http://localhost:5050/todo/${id}`)
    return response.data
})
export const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
    const response = await axios.delete(`http://localhost:5050/todo/${id}`)
    return response.data
})

export const getAllUserTodo = createAsyncThunk('getAllUserTodo', async (todoPosterId) => {
    const response = await axios.get(`http://localhost:5050/todo/userTodos/${todoPosterId}`)
    return response.data
})

export const updateTodo = createAsyncThunk('updateTodo', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/todo/${id}`, newData)
    return response.data
})


const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todo: [],
        originalData: [],
        filteredData: [],

        userAllTodo: [],
        filterUserAllTodo: [],
        originalUserAllTodo: [],
        oneTodo: {},
        loading: false,
        error: ""
    },
    reducers: {
        searchTodo: (state, action) => {
            const searchedTodo = action.payload.trim().toLowerCase()
            if (searchedTodo == '') {
                state.todo = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.todoContent.trim().toLowerCase().includes(searchedTodo));
                state.todo = [...searching]
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllTodos.fulfilled, (state, action) => {
            state.loading = false
            state.todo = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllUserTodo.pending, (state, action) => {
            state.loading = true
        }).addCase(getAllUserTodo.fulfilled, (state, action) => {
            state.loading = false
            state.userAllTodo = action.payload
            state.filterUserAllTodo = action.payload
            state.originalUserAllTodo = action.payload
        }).addCase(getAllUserTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getOneTodo.pending, (state, action) => {
            state.loading = true
        }).addCase(getOneTodo.fulfilled, (state, action) => {
            state.loading = false
            state.oneTodo = action.payload
        }).addCase(getOneTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteTodo.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todo = [...state.todo.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]

            state.userAllTodo = [...state.userAllTodo.filter((item) => item._id != action.payload._id)]
            state.filterUserAllTodo = [...state.filterUserAllTodo.filter((item) => item._id != action.payload._id)]
            state.originalUserAllTodo = [...state.originalUserAllTodo.filter((item) => item._id != action.payload._id)]
        }).addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postTodo.pending, (state, action) => {
            state.loading = true
        }).addCase(postTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todo.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)

            state.userAllTodo.push(action.payload)
            state.filterUserAllTodo.push(action.payload)
            state.originalUserAllTodo.push(action.payload)
        }).addCase(postTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })



        builder.addCase(updateTodo.pending, (state, action) => {
            state.loading = true
        }).addCase(updateTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todo = [action.payload, ...state.todo.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]

            state.userAllTodo = [action.payload, ...state.userAllTodo.filter(item => item._id != action.payload._id)]
            state.filterUserAllTodo = [action.payload, ...state.filterUserAllTodo.filter(item => item._id != action.payload._id)]
            state.originalUserAllTodo = [action.payload, ...state.originalUserAllTodo.filter(item => item._id != action.payload._id)]
        }).addCase(updateTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const {searchTodo } = todoSlice.actions
export default todoSlice.reducer