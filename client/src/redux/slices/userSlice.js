import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    const response = await axios.get(`http://localhost:5050/users`)
    return response.data
})

export const getOneUser = createAsyncThunk('getOneUser', async (id) => {
    const response = await axios.get(`http://localhost:5050/users/${id}`)
    return response.data
})

export const deleteUser = createAsyncThunk('deleteUser', async (id) => {
    const response = await axios.delete(`http://localhost:5050/users/${id}`)
    return response.data
})

export const getUserToken = createAsyncThunk('getUserToken', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.get(`http://localhost:5050/users/getMe`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
})
export const editUser = createAsyncThunk('editUser', async ({ id, newData }) => {

    const response = await axios.put(`http://localhost:5050/users/${id}`, newData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})

export const editUserPassword = createAsyncThunk('editUserPassword', async ({ id, newData }) => {

    const response = await axios.put(`http://localhost:5050/users/changePassword/${id}`, newData)
    localStorage.setItem('token', response.data.token)
    return response.data
})


export const addToWishlist = createAsyncThunk('addToWishlist', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/addToWishlist/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})
export const removeFromWishlist = createAsyncThunk('removeFromWishlist', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/removeFromWishlist/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})



export const addToBasket = createAsyncThunk('addToBasket', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/addToBasket/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})
export const removeFromBasket = createAsyncThunk('removeFromBasket', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/removeFromBasket/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})


export const clearBasket = createAsyncThunk('clearBasket', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/clearBasket/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})

export const clearWinningProduct = createAsyncThunk('clearWinningProduct', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/clearWinningProduct/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})

export const addToWinningProduct = createAsyncThunk('addToWinningProduct', async ({ id, newData }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {};
    }
    const response = await axios.put(`http://localhost:5050/users/addToWinningProduct/${id}`, newData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    localStorage.setItem('token', response.data.token)
    return response.data
})
export const loginUser = createAsyncThunk('loginUser', async (newData) => {
    const response = await axios.post(`http://localhost:5050/users/login`, newData)
    localStorage.setItem('token', response.data.token)
    return response.data
})


export const registerUser = createAsyncThunk('registerUser', async (newData) => {
    const response = await axios.post(`http://localhost:5050/users/register`, newData)
    localStorage.setItem('token', response.data.token)
    return response.data
})


export const postResetPassword = createAsyncThunk('postResetPassword', async (newData) => {
    const response = await axios.post(`http://localhost:5050/users/forgot-password`, newData)
    return response.data
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        filterUser: [],
        originalUser: [],
        userToken: {},
        userToken2: {},
        userToken3: {},
        oneUser: {},
        userLoading: false,
        tokenLoading: false,
        userStatus: false,
        userError: ''
    },
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem('token')
            state.userToken = {};
            state.userStatus = false
        },
        searchUser: (state, action) => {
            const searchedUser = action.payload.trim().toLowerCase()
            if (searchedUser == '') {
                state.users = [...state.originalUser]
            } else {
                const searching = state.filterUser.filter(item => item.firstName.trim().toLowerCase().includes(searchedUser))
                state.users = [...searching]
            }
        },
        sortUser: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.users = [...state.originalUser];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filterUser.sort((a, b) => a.firstName.localeCompare(b.firstName));
                state.users = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filterUser.sort((a, b) => b.firstName.localeCompare(a.firstName));
                state.users = [...sortZa];
            } else if (sorted === 'a-z') {
                const sortAZ = state.filterUser.sort((a, b) => a.lastName.localeCompare(b.lastName));
                state.users = [...sortAZ];
            } else if (sorted === 'z-a') {
                const sortZA = state.filterUser.sort((a, b) => b.lastName.localeCompare(a.lastName));
                state.users = [...sortZA];
            }
        },

        clearUserBasket: (state) => {
            state.userToken.basket = [];
        },


        searchWishlist: (state, action) => {
            const searchProducts = action.payload.trim().toLowerCase()
            if (searchProducts == '') {
                state.userToken.wishlist = [...state.userToken2.wishlist]
            } else {
                const searching = state.userToken3.wishlist.filter(item => item.productName.trim().toLowerCase().includes(searchProducts))
                state.userToken.wishlist = [...searching]
            }
        },
        sortWishlist: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.userToken.wishlist = [...state.userToken2.wishlist];
            } else if (sorted === 'A-Z') {
                const sortAz = state.userToken3.wishlist.sort((a, b) => a.productName.localeCompare(b.productName));
                state.userToken.wishlist = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.userToken3.wishlist.sort((a, b) => b.productName.localeCompare(a.productName));
                state.userToken.wishlist = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.userToken3.wishlist.sort((a, b) => a.afterPrice - b.afterPrice);
                state.userToken.wishlist = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.userToken3.wishlist.sort((a, b) => b.afterPrice - a.afterPrice);
                state.userToken.wishlist = [...sort90];
            } else if (sorted == 'Electronic') {
                const filterElectronic = state.userToken3.wishlist.filter(item => item.type == 'electronic');
                state.userToken.wishlist = [...filterElectronic];
            } else if (sorted == 'Jewelry') {
                const filterJewelry = state.userToken3.wishlist.filter(item => item.type == 'jewelry');
                state.userToken.wishlist = [...filterJewelry];
            } else if (sorted == 'Car') {
                const filterCar = state.userToken3.wishlist.filter(item => item.type == 'car');
                state.userToken.wishlist = [...filterCar];
            } else if (sorted == 'Latest') {
                const filterCreated = state.userToken3.wishlist.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                state.userToken.wishlist = [...filterCreated];
            } else if (sorted == 'Oldest') {
                const filterCreated2 = state.userToken3.wishlist.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                state.userToken.wishlist = [...filterCreated2];
            } else if (sorted === 'EndingSoon') {
                const filterEndingSoon = state.userToken3.wishlist.sort((a, b) => {
                    const timeLeftA = new Date(a.endTime) - new Date();
                    const timeLeftB = new Date(b.endTime) - new Date();
                    return timeLeftA - timeLeftB;
                });
                state.userToken.wishlist = [...filterEndingSoon];
            } else if (sorted === 'EndingLater') {
                const filterEndingLater = state.userToken3.wishlist.sort((a, b) => {
                    const timeLeftA = new Date(a.endTime) - new Date();
                    const timeLeftB = new Date(b.endTime) - new Date();
                    return timeLeftB - timeLeftA;
                });
                state.userToken.wishlist = [...filterEndingLater];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.userLoading = true
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = action.payload
            state.originalUser = action.payload
            state.filterUser = action.payload
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
            toast.error('Something Went Wrong,Please Try Again')
        })

        builder.addCase(getOneUser.pending, (state, action) => {
            state.userLoading = true
        }).addCase(getOneUser.fulfilled, (state, action) => {
            state.userLoading = false
            state.oneUser = action.payload
        }).addCase(getOneUser.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
            toast.error('Something Went Wrong,Please Try Again')
        })



        builder.addCase(editUser.pending, (state, action) => {
            state.userLoading = true
        }).addCase(editUser.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(editUser.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })

        builder.addCase(addToWinningProduct.pending, (state, action) => {
            state.userLoading = true
        }).addCase(addToWinningProduct.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(addToWinningProduct.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })

        builder.addCase(clearWinningProduct.pending, (state, action) => {
            state.userLoading = true
        }).addCase(clearWinningProduct.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(clearWinningProduct.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })
        builder.addCase(addToWishlist.pending, (state, action) => {
            state.userLoading = true
        }).addCase(addToWishlist.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(addToWishlist.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })

        builder.addCase(removeFromWishlist.pending, (state, action) => {
            state.userLoading = true
        }).addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(removeFromWishlist.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })



        builder.addCase(addToBasket.pending, (state, action) => {
            state.userLoading = true
        }).addCase(addToBasket.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(addToBasket.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })





        builder.addCase(removeFromBasket.pending, (state, action) => {
            state.userLoading = true
        }).addCase(removeFromBasket.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(removeFromBasket.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })



        builder.addCase(clearBasket.pending, (state, action) => {
            state.userLoading = true
        }).addCase(clearBasket.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(clearBasket.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })




        builder.addCase(editUserPassword.pending, (state, action) => {
            state.userLoading = true
        }).addCase(editUserPassword.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [action.payload, ...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [action.payload, ...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [action.payload, ...state.filterUser.filter(item => item._id != action.payload._id)]
            if (action.payload.profileImage) {
                state.userToken.profileImage = action.payload.profileImage;
            }
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(editUserPassword.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
        })

        builder.addCase(deleteUser.pending, (state, action) => {
            state.userLoading = true
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.userLoading = false
            state.users = [...state.users.filter(item => item._id != action.payload._id)]
            state.originalUser = [...state.originalUser.filter(item => item._id != action.payload._id)]
            state.filterUser = [...state.filterUser.filter(item => item._id != action.payload._id)]

        }).addCase(deleteUser.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
            toast.error('Something Went Wrong,Please Try Again')
        })


        builder.addCase(postResetPassword.pending, (state, action) => {
            state.userLoading = true
        }).addCase(postResetPassword.fulfilled, (state, action) => {
            state.userLoading = false

        }).addCase(postResetPassword.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
            toast.error('Something Went Wrong,Please Try Again')
        })



        builder.addCase(registerUser.pending, (state, action) => {
            state.userLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.userLoading = false
            state.users.push(action.payload)
            state.originalUser.push(action.payload)
            state.filterUser.push(action.payload)
            toast.success('Successfully registered! Welcome to our platform.');
        }).addCase(registerUser.rejected, (state, action) => {
            state.userLoading = false
            state.userError = action.payload
            toast.error('Something Went Wrong,Please Try Again')
        })



        builder.addCase(getUserToken.pending, (state, action) => {
            state.tokenLoading = true
        }).addCase(getUserToken.fulfilled, (state, action) => {
            state.tokenLoading = false
            const token = localStorage.getItem('token')

            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
        }).addCase(getUserToken.rejected, (state, action) => {
            state.tokenLoading = false
            state.userError = action.payload
            toast.error('Something Went Wrong,Please Try Again')
        })


        builder.addCase(loginUser.pending, (state, action) => {
            state.userLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.userLoading = false;
            state.userStatus = true;
            const token = localStorage.getItem('token')
            if (token) {
                const decode = jwtDecode(token)
                state.userToken = decode
                state.userToken2 = decode
                state.userToken3 = decode
            }
            state.userError = '';
            toast.success('Login successful! Welcome back.');
        }).addCase(loginUser.rejected, (state, action) => {
            state.userLoading = false;
            state.userStatus = false;
            state.userError = action.error.message;
        })

    }
})


export const { logOut, searchUser, clearUserBasket, sortUser, searchWishlist, sortWishlist } = userSlice.actions
export default userSlice.reducer