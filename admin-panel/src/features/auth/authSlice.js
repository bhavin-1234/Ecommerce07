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

export const loginAdmin = createAsyncThunk("auth/admin-login", async (userData, thunkAPI) => {
    // console.log(userData);
    // console.log(thunkAPI);
    try {
        return await authService.loginAdmin(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("order/get-orders", async (_, thunkAPI) => {
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

export const getMonthlyOrderData = createAsyncThunk("order/monthly-order-data", async (_, thunkAPI) => {
    try {
        return await authService.getMonthlyOrderData();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getYearlyOrderData = createAsyncThunk("order/yearly-order-data", async (_, thunkAPI) => {
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
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedInUser = action.payload;
                state.message = "success";
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.user = JSON.parse(localStorage.getItem("user")) || null;
                if (state.isSuccess) {
                    toast.success("Admin Logged In Successfully!");
                }
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.error.message;
                if (state.isError === true) {
                    toast.error(action.payload.message);
                }
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
                state.message = action.payload;
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
                state.message = action.payload;
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


