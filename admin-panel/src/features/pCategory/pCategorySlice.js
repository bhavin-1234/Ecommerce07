import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import pCategoryService from './pCategoryService';

export const getPCategory = createAsyncThunk("pCategory/get-pCategory", async (_, thunkAPI) => {
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
            .addCase(getPCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategories = action.payload;
                state.message = "success";
            })
            .addCase(getPCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.productCategories = null;
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
                state.createdProductCategory = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)

    }
});

export default pCategorySlice.reducer;