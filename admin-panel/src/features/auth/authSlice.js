import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from 'react-toastify';


const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

export const login = createAsyncThunk("auth/admin-login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrder = createAsyncThunk("order/get-order", async (id, thunkAPI) => {
    try {
        return await authService.getOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateOrderStatus = createAsyncThunk("order/update-status", async (data, thunkAPI) => {
    try {
        return await authService.updateOrderStatus(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getMonthlyOrderData = createAsyncThunk("order/monthly-order-data", async (thunkAPI) => {
    try {
        return await authService.getMonthlyOrderData();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getYearlyOrderData = createAsyncThunk("order/yearly-order-data", async (thunkAPI) => {
    try {
        return await authService.getYearlyOrderData();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});




export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success"
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.error;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success"
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
                state.message = action.error;
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
                state.message = "success"
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
                state.message = action.error;
            })
            .addCase(getMonthlyOrderData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyOrderData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = "success"
            })
            .addCase(getMonthlyOrderData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
                state.message = action.error;
            })
            .addCase(getYearlyOrderData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyOrderData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "success"
            })
            .addCase(getYearlyOrderData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
                state.message = action.error;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedOrder = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Status Updated Successfully!");
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
                state.message = action.error;
                if (!state.isSuccess) {
                    toast.error("Something Went Wrong!");
                }
            })
    }
});

export default authSlice.reducer;


