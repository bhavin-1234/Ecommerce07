import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import brandService from './brandService';

export const getBrands = createAsyncThunk("brand/get-brands", async (_, thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const createBrand = createAsyncThunk("brand/create-brand", async (brandData, thunkAPI) => {
    try {
        return await brandService.createBrand(brandData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
                state.message = "success";
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.brands = null;
                state.message = action.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
                state.message = "success";
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.createdBrand = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
});

export default brandSlice.reducer;