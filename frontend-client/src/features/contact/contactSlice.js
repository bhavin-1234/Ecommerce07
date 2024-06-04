import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";




export const postEnquiry = createAsyncThunk("enquiry/post-enquiry", async (enquiryData, thunkAPI) => {
    try {
        return await contactService.postEnquiry(enquiryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});





const initialState = {
    contact: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(postEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contact = action.payload;
                state.message = "success";
            })
            .addCase(postEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }

});

export default contactSlice.reducer;




