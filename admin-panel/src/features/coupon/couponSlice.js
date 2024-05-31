import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import couponService from './couponService';

export const getCoupons = createAsyncThunk("coupon/get-coupons", async (_, thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getCoupon = createAsyncThunk("coupon/get-coupon", async (couponID, thunkAPI) => {
    try {
        return await couponService.getCoupon(couponID);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCoupon = createAsyncThunk("coupon/create-coupon", async (couponData, thunkAPI) => {
    try {
        return await couponService.createCoupon(couponData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateCoupon = createAsyncThunk("coupon/update-coupon", async (data, thunkAPI) => {
    try {
        return await couponService.updateCoupon(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteCoupon = createAsyncThunk("coupon/delete-coupon", async (couponId, thunkAPI) => {
    try {
        return await couponService.deleteCoupon(couponId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const resetState = createAction("Reset_all");

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
                state.message = "success";
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.coupons = null;
                state.message = action.error;
            })
            .addCase(getCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedCoupon = action.payload;
                state.message = "success";
            })
            .addCase(getCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.productCategories = null;
                state.message = action.error;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
                state.message = "success";
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdCoupon = null;
                state.message = action.error;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
                state.message = "success";
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.updatedPCategory = null;
                state.message = action.error;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
                state.message = "success";
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.deletedPCategory = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
});

export default couponSlice.reducer;