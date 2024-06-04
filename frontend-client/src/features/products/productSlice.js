import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";



export const getProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {
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

export const addToWishList = createAsyncThunk("product/add-to-wishlist", async (productId, thunkAPI) => {
    try {
        return await productService.addToWishList(productId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
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
                state.message = action.error;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
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
                state.message = action.error;
            })
            .addCase(addToWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishList = action.payload;
                state.message = "success";
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }

});

export default productSlice.reducer;




