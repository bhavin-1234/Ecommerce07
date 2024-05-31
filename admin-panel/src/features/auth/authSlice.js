import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


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

export const getOrders = createAsyncThunk("order/get-orders", async (_, thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrderByUser = createAsyncThunk("order/get-order", async (id, thunkAPI) => {
    try {
        return await authService.getOrder(id);
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
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderbyuser = action.payload;
                state.message = "success"
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
                state.message = action.error;
            })
    }
});

export default authSlice.reducer;


