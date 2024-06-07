import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";



export const getProducts = createAsyncThunk("product/get-products", async (data, thunkAPI) => {
    try {
        return await productService.getProducts(data);
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

export const rateProduct = createAsyncThunk("product/rating", async (data, thunkAPI) => {
    try {
        return await productService.rateProduct(data);
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
            .addCase(rateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                state.message = "Rating Added Successfully!";
                if (state.isSuccess) {
                    toast.success("Rating Added Successfully!");
                }
            })
            .addCase(rateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }

});

export default productSlice.reducer;




