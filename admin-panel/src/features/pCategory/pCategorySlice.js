import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import pCategoryService from './pCategoryService';

export const getPCategories = createAsyncThunk("pCategory/get-pCategories", async (_, thunkAPI) => {
    try {
        return await pCategoryService.getPCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createPCategory = createAsyncThunk("pCategory/create-pCategory", async (pCategoryData, thunkAPI) => {
    try {
        return await pCategoryService.createPCategory(pCategoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getPCategory = createAsyncThunk("pCategory/get-pCategorY", async (pCategoryID, thunkAPI) => {
    try {
        return await pCategoryService.getPCategory(pCategoryID);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updatePCategory = createAsyncThunk("pCategory/update-pCategory", async (data, thunkAPI) => {
    try {
        return await pCategoryService.updatePCategory(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deletePCategory = createAsyncThunk("pCategory/delete-pCategory", async (pCategoryId, thunkAPI) => {
    try {
        return await pCategoryService.deletePCategory(pCategoryId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");


const initialState = {
    productCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const pCategorySlice = createSlice({
    name: "pCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategories = action.payload;
                state.message = "success";
            })
            .addCase(getPCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.productCategories = null;
                state.message = action.error;
            })
            .addCase(getPCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedPCategory = action.payload;
                state.message = "success";
            })
            .addCase(getPCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.productCategories = null;
                state.message = action.error;
            })
            .addCase(createPCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProductCategory = action.payload;
                state.message = "success";
            })
            .addCase(createPCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdProductCategory = null;
                state.message = action.error;
            })
            .addCase(updatePCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedPCategory = action.payload;
                state.message = "success";
            })
            .addCase(updatePCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.updatedPCategory = null;
                state.message = action.error;
            })
            .addCase(deletePCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedPCategory = action.payload;
                state.message = "success";
            })
            .addCase(deletePCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.deletedPCategory = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)

    }
});

export default pCategorySlice.reducer;