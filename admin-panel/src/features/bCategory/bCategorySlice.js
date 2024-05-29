import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import bCategoryService from './bCategoryService';

export const getBCategory = createAsyncThunk("bCategory/get-bCategory", async (_, thunkAPI) => {
    try {
        return await bCategoryService.getBCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBCategory = createAsyncThunk("bCategory/create-bCategory", async (bCategoryData, thunkAPI) => {
    try {
        return await bCategoryService.createBCategory(bCategoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const bCategorySlice = createSlice({
    name: "bCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
                state.message = "success";
            })
            .addCase(getBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.blogCategories = null;
                state.message = action.error;
            })
            .addCase(createBCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlogCategory = action.payload;
                state.message = "success";
            })
            .addCase(createBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.createdBlogCategory = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
});

export default bCategorySlice.reducer;