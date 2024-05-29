import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";


const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const uploadImages = createAsyncThunk("images/upload", async (data, thunkAPI) => {
    try {
        const formData = new FormData();
        data.map((dataImg, index) => {
            formData.append("images", data[index]);
        })
        console.log(formData);
        return await imageService.uploadImages(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteImages = createAsyncThunk("images/delete", async (_, thunkAPI) => {
    try {

        return await imageService.deleteImages();
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
            .addCase(uploadImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = action.payload;
                state.message = "success"
            })
            .addCase(uploadImages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.images = null;
                state.message = action.error;
            })
            .addCase(deleteImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteImages.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = [];
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


