import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import brandService from './brandService';

export const getAllBrands = createAsyncThunk("brand/get-brands", async (_, thunkAPI) => {
    try {
        return await brandService.getAllBrands();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABrand = createAsyncThunk("brand/get-brand", async (brandId, thunkAPI) => {
    try {
        return await brandService.getABrand(brandId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBrand = createAsyncThunk("brand/create-brand", async (brandData, thunkAPI) => {
    console.log(brandData);
    try {
        return await brandService.createBrand(brandData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBrand = createAsyncThunk("brand/update-brand", async (data, thunkAPI) => {
    try {
        return await brandService.updateBrand(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBrand = createAsyncThunk("brand/delete-brand", async (brandId, thunkAPI) => {
    try {
        return await brandService.deleteBrand(brandId);
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
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
                state.message = "success";
            })
            .addCase(getAllBrands.rejected, (state, action) => {
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
                // state.createdBrand = null;
                state.message = action.error;
            })
            .addCase(getABrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getABrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedBrand = action.payload.title;
                state.message = "success";
            })
            .addCase(getABrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.fetchedBrand = null;
                state.message = action.error;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBrand = action.payload;
                state.message = "success";
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.updatedBrand = null;
                state.message = action.error;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBrand = action.payload;
                state.message = "success";
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.deletedBrand = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
});

export default brandSlice.reducer;