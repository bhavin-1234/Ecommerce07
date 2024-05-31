import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";


const initialState = {
    blogImages: [],
    productImages: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const uploadImagesBlogs = createAsyncThunk("images/upload/blogs", async (formData, thunkAPI) => {
    try {
        return await imageService.uploadImagesBlogs(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const uploadImagesProducts = createAsyncThunk("images/upload/products", async (formData, thunkAPI) => {
    try {
        return await imageService.uploadImagesProducts(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteImages = createAsyncThunk("images/delete", async (deleteId, thunkAPI) => {
    console.log(deleteId);
    try {

        return await imageService.deleteImages(deleteId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImagesBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImagesBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogImages.push(action.payload);
                state.message = "success"
            })
            .addCase(uploadImagesBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.images = null;
                state.message = action.error;
            })
            .addCase(uploadImagesProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImagesProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productImages = action.payload;
                state.message = "success"
            })
            .addCase(uploadImagesProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.images = null;
                state.message = action.error;
            })
            .addCase(deleteImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = action.payload;
                state.message = "success"
            })
            .addCase(deleteImages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.images = action.payload;
                state.message = action.error;
            })
    }
});

export default imageSlice.reducer;


