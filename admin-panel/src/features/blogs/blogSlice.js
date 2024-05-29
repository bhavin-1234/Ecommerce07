import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogService from './blogService';

export const getBlogs = createAsyncThunk("blog/get-blogs", async (_, thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlog = createAsyncThunk("blog/create-blog", async (blogData, thunkAPI) => {
    try {
        return await blogService.createBlog(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");


const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true
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
                state.blogs = null;
                state.message = action.error;
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload;
                state.message = "success";
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.createdBlog = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)

    }
});

export default blogSlice.reducer;