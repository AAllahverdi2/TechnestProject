import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import axios from "axios";
export const getAllQuestions = createAsyncThunk('getAllQuestions', async () => {
    const response = await axios.get(`http://localhost:5050/questions`)
    return response.data
})
export const postQuestions = createAsyncThunk('postQuestions', async (newData) => {
    const response = await axios.post(`http://localhost:5050/questions`, newData)
    return response.data
})

export const getOneQuestions = createAsyncThunk('getOneQuestions', async (id) => {
    const response = await axios.get(`http://localhost:5050/questions/${id}`)
    return response.data
})
export const deleteQuestions = createAsyncThunk('deleteQuestions', async (id) => {
    const response = await axios.delete(`http://localhost:5050/questions/${id}`)
    return response.data
})

export const updateQuestions = createAsyncThunk('updateQuestions', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/questions/${id}`, newData)
    return response.data
})


const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        questions: [],
        originalData: [],
        filteredData: [],
        oneQuestion: {},
        questionsLoading: false,
        error: ""
    },
    reducers: {
        searchQuestions: (state, action) => {
            const searchedQuestions = action.payload.trim().toLowerCase()
            if (searchedQuestions == '') {
                state.questions = [...state.originalData]
            } else {
                const searching = state.filteredData.filter(item => item.questionTitle.trim().toLowerCase().includes(searchedQuestions))
                state.questions = [...searching]
            }
        },
        sortQuestions: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.questions = [...state.originalData];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredData.sort((a, b) => a.questionTitle.localeCompare(b.questionTitle));
                state.questions = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredData.sort((a, b) => b.questionTitle.localeCompare(a.questionTitle));
                state.questions = [...sortZa];
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllQuestions.pending, (state, action) => {
            state.questionsLoading = true
        }).addCase(getAllQuestions.fulfilled, (state, action) => {
            state.questionsLoading = false
            state.questions = action.payload
            state.originalData = action.payload
            state.filteredData = action.payload
        }).addCase(getAllQuestions.rejected, (state, action) => {
            state.questionsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })


        builder.addCase(getOneQuestions.pending, (state, action) => {
            state.questionsLoading = true
        }).addCase(getOneQuestions.fulfilled, (state, action) => {
            state.questionsLoading = false
            state.oneQuestion = action.payload
        }).addCase(getOneQuestions.rejected, (state, action) => {
            state.questionsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteQuestions.pending, (state, action) => {
            state.questionsLoading = true
        }).addCase(deleteQuestions.fulfilled, (state, action) => {
            state.questionsLoading = false
            state.questions = [...state.questions.filter((item) => item._id != action.payload._id)]
            state.originalData = [...state.originalData.filter((item) => item._id != action.payload._id)]
            state.filteredData = [...state.filteredData.filter((item) => item._id != action.payload._id)]
            toast.success("Question Successfully Deleted")
        }).addCase(deleteQuestions.rejected, (state, action) => {
            state.questionsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(postQuestions.pending, (state, action) => {
            state.questionsLoading = true
        }).addCase(postQuestions.fulfilled, (state, action) => {
            state.questionsLoading = false
            state.questions.push(action.payload)
            state.originalData.push(action.payload)
            state.filteredData.push(action.payload)
            toast.success("Question Successfully Added")
        }).addCase(postQuestions.rejected, (state, action) => {
            state.questionsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateQuestions.pending, (state, action) => {
            state.questionsLoading = true
        }).addCase(updateQuestions.fulfilled, (state, action) => {
            state.questionsLoading = false
            state.questions = [action.payload, ...state.questions.filter(item => item._id != action.payload._id)]
            state.originalData = [action.payload, ...state.originalData.filter(item => item._id != action.payload._id)]
            state.filteredData = [action.payload, ...state.filteredData.filter(item => item._id != action.payload._id)]
            toast.success("Question Successfully Updated")
        }).addCase(updateQuestions.rejected, (state, action) => {
            state.questionsLoading = false
            state.error = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})
export const { searchQuestions, sortQuestions } = questionsSlice.actions
export default questionsSlice.reducer