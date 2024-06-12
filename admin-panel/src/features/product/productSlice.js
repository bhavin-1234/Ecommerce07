import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productService from '../product/productService';
import { toast } from 'react-toastify';

export const getProducts = createAsyncThunk("product/get-products", async (_, thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getProduct = createAsyncThunk("product/get-product", async (productId, thunkAPI) => {
    try {
        return await productService.getProduct(productId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProduct = createAsyncThunk("product/create-product", async (productData, thunkAPI) => {
    try {
        return await productService.createProduct(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProduct = createAsyncThunk("product/update-product", async (productData, thunkAPI) => {
    try {
        return await productService.updateProduct(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteProduct = createAsyncThunk("product/delete-product", async (productId, thunkAPI) => {
    try {
        return await productService.deleteProduct(productId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");


const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
                state.message = "success";
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.products = null;
                state.message = action.error;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedProduct = action.payload;
                state.message = "success";
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.products = null;
                state.message = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Product Added Succesfully!");
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdProduct = null;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Product Updated Succesfully!");
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdProduct = null;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
                state.message = "success";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdProduct = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)

    }
});

export default productSlice.reducer;