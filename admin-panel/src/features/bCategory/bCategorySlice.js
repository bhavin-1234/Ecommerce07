import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import bCategoryService from './bCategoryService';

export const getBCategories = createAsyncThunk("bCategory/get-bCategories", async (_, thunkAPI) => {
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

export const getBCategory = createAsyncThunk("bCategory/get-bCategory", async (bCategoryID, thunkAPI) => {
    try {
        return await bCategoryService.getBCategory(bCategoryID);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBCategory = createAsyncThunk("bCategory/update-bCategory", async (data, thunkAPI) => {
    try {
        return await bCategoryService.updateBCategory(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBCategory = createAsyncThunk("bCategory/delete-bCategory", async (bCategoryId, thunkAPI) => {
    try {
        return await bCategoryService.deleteBCategory(bCategoryId);
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
            .addCase(getBCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
                state.message = "success";
            })
            .addCase(getBCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.blogCategories = null;
                state.message = action.error;
            })
            .addCase(getBCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedBCategory = action.payload?.title;
                state.message = "success";
            })
            .addCase(getBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.productCategories = null;
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
                // state.createdBlogCategory = null;
                state.message = action.error;
            })
            .addCase(updateBCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBCategory = action.payload;
                state.message = "success";
            })
            .addCase(updateBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.updatedPCategory = null;
                state.message = action.error;
            })
            .addCase(deleteBCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBCategory = action.payload;
                state.message = "success";
            })
            .addCase(deleteBCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.deletedPCategory = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
});

export default bCategorySlice.reducer;