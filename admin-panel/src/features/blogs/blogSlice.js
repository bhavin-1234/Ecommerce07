import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogService from './blogService';

export const getBlogs = createAsyncThunk("blog/get-blogs", async (_, thunkAPI) => {
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

export const createBlog = createAsyncThunk("blog/create-blog", async (blogData, thunkAPI) => {
    try {
        return await blogService.createBlog(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBlog = createAsyncThunk("blog/update-blog", async (blogData, thunkAPI) => {
    try {
        return await blogService.updateBlog(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBlog = createAsyncThunk("blog/delete-blog", async (blogId, thunkAPI) => {
    try {
        return await blogService.deleteBlog(blogId);
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
                // state.blogs = null;
                state.message = action.error;
            })
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.fetchedBlogTitle = action.payload?.title;
                state.fetchedBlogDescription = action.payload?.description;
                state.fetchedBlogCategory = action.payload?.category;
                state.fetchedBlogImages = action.payload?.images;
                state.message = "success";
            })
            .addCase(getBlog.rejected, (state, action) => {
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
                // state.createdBlog = null;
                state.message = action.error;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
                state.message = "success";
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdBlog = null;
                state.message = action.error;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
                state.message = "success";
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.createdBlog = null;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)

    }
});

export default blogSlice.reducer;