import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import enquiryService from './enquiryService';

export const getEnquiries = createAsyncThunk("enquiry/get-enquiries", async (_, thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getEnquiry = createAsyncThunk("enquiry/get-enquiry", async (enquiryId, thunkAPI) => {
    try {
        return await enquiryService.getEnquiry(enquiryId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteEnquiry = createAsyncThunk("enquiry/delete-enquiry", async (enquiryId, thunkAPI) => {
    try {
        return await enquiryService.deleteEnquiry(enquiryId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateEnquiry = createAsyncThunk("enquiry/update-enquiry", async (data, thunkAPI) => {
    try {
        return await enquiryService.updateEnquiry(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const enquirySlice = createSlice({
    name: "enquiry",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
                state.message = "success";
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.enquiries = null;
                state.message = action.error;
            })
            .addCase(getEnquiry.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedEnquiry = action.payload;
                state.message = "success";
            })
            .addCase(getEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.enquiries = null;
                state.message = action.error;
            })
            .addCase(deleteEnquiry.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
                state.message = "success";
            })
            .addCase(deleteEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.enquiries = null;
                state.message = action.error;
            })
            .addCase(updateEnquiry.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedEnquiry = action.payload;
                state.message = "success";
            })
            .addCase(updateEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.enquiries = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
});

export default enquirySlice.reducer;