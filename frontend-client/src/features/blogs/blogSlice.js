import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";




export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getBlog = createAsyncThunk("blog/get-blog", async (blogId, thunkAPI) => {
    try {
        return await blogService.getBlog(blogId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});




const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
                state.message = "success";
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedBlog = action.payload;
                state.message = "success";
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }

});

export default blogSlice.reducer;




