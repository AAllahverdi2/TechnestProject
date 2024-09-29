import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const response = await axios.get(`http://localhost:5050/products`)

    return response.data
})
export const getOneProducts = createAsyncThunk('getOneProducts', async (id) => {
    const response = await axios.get(`http://localhost:5050/products/${id}`)

    return response.data
})

export const getAllUserProducts = createAsyncThunk('getAllUserProducts', async (userId) => {
    const response = await axios.get(`http://localhost:5050/products/userProduct/${userId}`)

    return response.data
})

export const getAllBiddersProducts = createAsyncThunk('getAllBiddersProducts', async (bidderId) => {
    const response = await axios.get(`http://localhost:5050/products/biddersProduct/${bidderId}`)

    return response.data
})



export const deleteProduct = createAsyncThunk('deleteProduct', async (id) => {
    const response = await axios.delete(`http://localhost:5050/products/${id}`)

    return response.data
})
export const deleteMultipleProducts = createAsyncThunk('deleteMultipleProducts', async (productIds) => {
    const response = await axios.post(
        'http://localhost:5050/products/deleteMultiple',
        { productIds }
      );

    return response.data
})

export const updateProduct = createAsyncThunk('updateProduct', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/products/${id}`, newData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
})

export const updateProdIncreament = createAsyncThunk('updateProdIncreament', async (id) => {
    const response = await axios.put(`http://localhost:5050/products/watchers/${id}`)
    return response.data
})
export const increaseAfterPrice = createAsyncThunk('increaseAfterPrice', async ({ id, newData }) => {
    const response = await axios.put(`http://localhost:5050/products/increaseAfterPrice/${id}`, newData)
    return response.data
})
export const postProduct = createAsyncThunk('postProduct', async (newData) => {
    const response = await axios.post(`http://localhost:5050/products`, newData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
})


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        lastestProd: [],
        originalProducts: [],
        filteredProducts: [],
        oneUserAllProducts: [],
        oneUserFilterProducts: [],
        oneUserOriginalProducts: [],
        oneBiddersProduct: [],

        searchedProd: [],
        originalState: [],
        filteredState: [],
        oneProduct: {},
        productLoading: false,
        oneProductLoading: false,
        productError: '',
    },
    reducers: {

        searchProducts3: (state, action) => {
            const searchProducts = action.payload.trim().toLowerCase()
            if (searchProducts == '') {
                state.searchedProd = [...state.originalState]
            } else {
                const searching = state.filteredState.filter(item => item.productName.trim().toLowerCase().includes(searchProducts))
                state.searchedProd = [...searching]
            }
        },

        searchProducts: (state, action) => {
            const searchProducts = action.payload.trim().toLowerCase()
            if (searchProducts == '') {
                state.oneUserAllProducts = [...state.oneUserOriginalProducts]
            } else {
                const searching = state.oneUserFilterProducts.filter(item => item.productName.trim().toLowerCase().includes(searchProducts))
                state.oneUserAllProducts = [...searching]
            }
        },

        searchProducts2: (state, action) => {
            const searchProducts = action.payload.trim().toLowerCase()
            if (searchProducts == '') {
                state.products = [...state.originalProducts]
            } else {
                const searching = state.filteredProducts.filter(item => item.productName.trim().toLowerCase().includes(searchProducts))
                state.products = [...searching]
            }
        },
        sortProducts: (state, action) => {
            const sorted = action.payload;
            if (sorted === 'df') {
                state.products = [...state.originalProducts];
            } else if (sorted === 'A-Z') {
                const sortAz = state.filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
                state.products = [...sortAz];
            } else if (sorted === 'Z-A') {
                const sortZa = state.filteredProducts.sort((a, b) => b.productName.localeCompare(a.productName));
                state.products = [...sortZa];
            } else if (sorted === '0-9') {
                const sort09 = state.filteredProducts.sort((a, b) => a.afterPrice - b.afterPrice);
                state.products = [...sort09];
            } else if (sorted === '9-0') {
                const sort90 = state.filteredProducts.sort((a, b) => b.afterPrice - a.afterPrice);
                state.products = [...sort90];
            } else if (sorted == 'Electronic') {
                const filterElectronic = state.filteredProducts.filter(item => item.type == 'electronic');
                state.products = [...filterElectronic];
            } else if (sorted == 'Jewelry') {
                const filterJewelry = state.filteredProducts.filter(item => item.type == 'jewelry');
                state.products = [...filterJewelry];
            } else if (sorted == 'Car') {
                const filterCar = state.filteredProducts.filter(item => item.type == 'car');
                state.products = [...filterCar];
            } else if (sorted == 'Latest') {
                const filterCreated = state.filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                state.products = [...filterCreated];
            } else if (sorted == 'Oldest') {
                const filterCreated2 = state.filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                state.products = [...filterCreated2];
            } else if (sorted === 'EndingSoon') {
                const filterEndingSoon = state.filteredProducts.sort((a, b) => {
                    const timeLeftA = new Date(a.endTime) - new Date();
                    const timeLeftB = new Date(b.endTime) - new Date();
                    return timeLeftA - timeLeftB;
                });
                state.products = [...filterEndingSoon];
            } else if (sorted === 'EndingLater') {
                const filterEndingLater = state.filteredProducts.sort((a, b) => {
                    const timeLeftA = new Date(a.endTime) - new Date();
                    const timeLeftB = new Date(b.endTime) - new Date();
                    return timeLeftB - timeLeftA;
                });
                state.products = [...filterEndingLater];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.productLoading = true
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.productLoading = false
            state.products = action.payload
            state.originalProducts = action.payload
            state.filteredProducts = action.payload
            state.searchedProd = action.payload
            state.originalState = action.payload
            state.filteredState = action.payload


            state.lastestProd = action.payload
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getAllUserProducts.pending, (state, action) => {
            state.productLoading = true
        }).addCase(getAllUserProducts.fulfilled, (state, action) => {
            state.productLoading = false
            state.oneUserAllProducts = action.payload
            state.oneUserFilterProducts = action.payload
            state.oneUserOriginalProducts = action.payload
        }).addCase(getAllUserProducts.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })
        builder.addCase(getAllBiddersProducts.pending, (state, action) => {
            state.productLoading = true
        }).addCase(getAllBiddersProducts.fulfilled, (state, action) => {
            state.productLoading = false
            state.oneBiddersProduct = action.payload
        }).addCase(getAllBiddersProducts.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")
        })

        builder.addCase(getOneProducts.pending, (state, action) => {
            state.oneProductLoading = true
        }).addCase(getOneProducts.fulfilled, (state, action) => {
            state.oneProductLoading = false
            state.oneProduct = action.payload
        }).addCase(getOneProducts.rejected, (state, action) => {
            state.oneProductLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteProduct.pending, (state, action) => {
            state.productLoading = true
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            state.productLoading = false
            state.products = [...state.products.filter((item) => item._id != action.payload._id)]
            state.originalProducts = [...state.originalProducts.filter((item) => item._id != action.payload._id)]
            state.filteredProducts = [...state.filteredProducts.filter((item) => item._id != action.payload._id)]
            state.lastestProd = [...state.lastestProd.filter((item) => item._id != action.payload._id)]

            state.oneUserAllProducts = [...state.oneUserAllProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserFilterProducts = [...state.oneUserFilterProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserOriginalProducts = [...state.oneUserOriginalProducts.filter((item) => item._id != action.payload._id)]


            state.searchedProd = [...state.searchedProd.filter((item) => item._id != action.payload._id)]
            state.originalState = [...state.originalState.filter((item) => item._id != action.payload._id)]
            state.filteredState = [...state.filteredState.filter((item) => item._id != action.payload._id)]

        }).addCase(deleteProduct.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })


        builder.addCase(deleteMultipleProducts.pending, (state, action) => {
            state.productLoading = true
        }).addCase(deleteMultipleProducts.fulfilled, (state, action) => {
            state.productLoading = false

        }).addCase(deleteMultipleProducts.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })

        builder.addCase(postProduct.pending, (state, action) => {
            state.productLoading = true
        }).addCase(postProduct.fulfilled, (state, action) => {
            state.productLoading = false
            state.products.push(action.payload)
            state.originalProducts.push(action.payload)
            state.filteredProducts.push(action.payload)
            state.lastestProd.push(action.payload)
            state.oneUserAllProducts.push(action.payload)
            state.oneUserFilterProducts.push(action.payload)
            state.oneUserOriginalProducts.push(action.payload)

            state.searchedProd.push(action.payload)
            state.originalState.push(action.payload)
            state.filteredState.push(action.payload)


            toast.success("Product Successfully Created")
        }).addCase(postProduct.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })



        builder.addCase(updateProduct.pending, (state, action) => {
            state.productLoading = true
        }).addCase(updateProduct.fulfilled, (state, action) => {
            state.productLoading = false

            state.products = [action.payload, ...state.products.filter((item) => item._id != action.payload._id)]
            state.originalProducts = [action.payload, ...state.originalProducts.filter((item) => item._id != action.payload._id)]
            state.filteredProducts = [action.payload, ...state.filteredProducts.filter((item) => item._id != action.payload._id)]
            state.lastestProd = [action.payload, ...state.lastestProd.filter((item) => item._id != action.payload._id)]

            state.oneUserAllProducts = [action.payload, ...state.oneUserAllProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserFilterProducts = [action.payload, ...state.oneUserFilterProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserOriginalProducts = [action.payload, ...state.oneUserOriginalProducts.filter((item) => item._id != action.payload._id)]

            state.searchedProd = [action.payload, ...state.searchedProd.filter((item) => item._id != action.payload._id)]
            state.originalState = [action.payload, ...state.originalState.filter((item) => item._id != action.payload._id)]
            state.filteredState = [action.payload, ...state.filteredState.filter((item) => item._id != action.payload._id)]


        }).addCase(updateProduct.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
        builder.addCase(updateProdIncreament.pending, (state, action) => {
            state.productLoading = true
        }).addCase(updateProdIncreament.fulfilled, (state, action) => {
            state.productLoading = false

            state.products = [action.payload, ...state.products.filter((item) => item._id != action.payload._id)]
            state.originalProducts = [action.payload, ...state.originalProducts.filter((item) => item._id != action.payload._id)]
            state.filteredProducts = [action.payload, ...state.filteredProducts.filter((item) => item._id != action.payload._id)]
            state.lastestProd = [action.payload, ...state.lastestProd.filter((item) => item._id != action.payload._id)]

            state.searchedProd = [action.payload, ...state.searchedProd.filter((item) => item._id != action.payload._id)]
            state.originalState = [action.payload, ...state.originalState.filter((item) => item._id != action.payload._id)]
            state.filteredState = [action.payload, ...state.filteredState.filter((item) => item._id != action.payload._id)]

            state.oneUserAllProducts = [action.payload, ...state.oneUserAllProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserFilterProducts = [action.payload, ...state.oneUserFilterProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserOriginalProducts = [action.payload, ...state.oneUserOriginalProducts.filter((item) => item._id != action.payload._id)]
        }).addCase(updateProdIncreament.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })

        builder.addCase(increaseAfterPrice.pending, (state, action) => {
            state.productLoading = true
        }).addCase(increaseAfterPrice.fulfilled, (state, action) => {
            state.productLoading = false

            state.products = [action.payload, ...state.products.filter((item) => item._id != action.payload._id)]
            state.originalProducts = [action.payload, ...state.originalProducts.filter((item) => item._id != action.payload._id)]
            state.filteredProducts = [action.payload, ...state.filteredProducts.filter((item) => item._id != action.payload._id)]
            state.lastestProd = [action.payload, ...state.lastestProd.filter((item) => item._id != action.payload._id)]
            state.searchedProd = [action.payload, ...state.searchedProd.filter((item) => item._id != action.payload._id)]
            state.originalState = [action.payload, ...state.originalState.filter((item) => item._id != action.payload._id)]
            state.filteredState = [action.payload, ...state.filteredState.filter((item) => item._id != action.payload._id)]


            state.oneUserAllProducts = [action.payload, ...state.oneUserAllProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserFilterProducts = [action.payload, ...state.oneUserFilterProducts.filter((item) => item._id != action.payload._id)]
            state.oneUserOriginalProducts = [action.payload, ...state.oneUserOriginalProducts.filter((item) => item._id != action.payload._id)]
        }).addCase(increaseAfterPrice.rejected, (state, action) => {
            state.productLoading = false
            state.productError = action.payload
            toast.error("Something Wrong ,Please Try Again")

        })
    }
})

export const { searchProducts, searchProducts2, sortProducts, searchProducts3 } = productsSlice.actions
export default productsSlice.reducer