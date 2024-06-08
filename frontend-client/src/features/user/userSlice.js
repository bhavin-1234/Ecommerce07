import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { userService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await userService.registerUser(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (loginData, thunkAPI) => {
    try {
        return await userService.loginUser(loginData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserWishList = createAsyncThunk("user/wishlist", async (thunkAPI) => {
    try {
        return await userService.getUserWishList();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToCart = createAsyncThunk("user/add-to-cart", async (cartData, thunkAPI) => {
    try {
        return await userService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getCart = createAsyncThunk("user/get-cart", async (thunkAPI) => {
    try {
        return await userService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeProductFromCart = createAsyncThunk("user/delete-product-cart", async (cartItemId, thunkAPI) => {
    try {
        return await userService.removeProductFromCart(cartItemId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProductQuantityFromCart = createAsyncThunk("user/update-product-cart", async (cartItemDetail, thunkAPI) => {
    try {
        return await userService.updateProductQuantityFromCart(cartItemDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createOrder = createAsyncThunk("user/create-order", async (orderDetails, thunkAPI) => {
    try {
        return await userService.createOrder(orderDetails);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserOrders = createAsyncThunk("user/get-all-order", async (thunkAPI) => {
    try {
        return await userService.geUserOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateUser = createAsyncThunk("user/update-user", async (userData, thunkAPI) => {
    try {
        return await userService.updateUser(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPasswordToken = createAsyncThunk("user/forgot-password", async (data, thunkAPI) => {
    try {
        return await userService.forgotPassToken(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetPassWord = createAsyncThunk("user/reset-password", async (data, thunkAPI) => {
    try {
        return await userService.resetPassWord(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const emptyCart = createAsyncThunk("user/empty-cart", async (thunkAPI) => {
    try {
        return await userService.emptyCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    user: JSON.parse(localStorage.getItem("digiticToken")) || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("User Registered Successfully!"
                    );
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.createdUser = null;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error(action.payload.message);
                    // toast.error(action.payload.message);
                    // toast.error(action.payload.response.data.message);
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedInUser = action.payload;
                state.message = "success";
                localStorage.setItem("digiticToken", JSON.stringify(action.payload));
                state.user = JSON.parse(localStorage.getItem("digiticToken")) || null;
                if (state.isSuccess) {
                    toast.success("User Logged In Successfully!"
                    );
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.loggedInUser = null;
                state.message = action.error.message;
                if (state.isError === true) {
                    toast.error(action.payload.message);
                }
            })
            .addCase(getUserWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
                state.message = "success";
            })
            .addCase(getUserWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addedToCart = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Product Added to Cart Successfully!");
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error(action.error);
                }
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload || [];
                state.message = "success";
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.removedProductCart = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Product removed From Cart Successfully!");
                }
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success(action.error);
                }
            })
            .addCase(updateProductQuantityFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductQuantityFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProductCart = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Product updated From Cart Successfully!");
                }
            })
            .addCase(updateProductQuantityFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                state.message = "success";
                // if (state.isSuccess) {
                //     toast.success("Order Created Successfully!");
                // }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.createdOrder = null;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getuserOrders = action.payload;
                state.message = "success";
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                state.message = "success";
                const currentUserData = JSON.parse(localStorage.getItem("digiticToken"));
                const updatedUserData = {
                    id: currentUserData?.id,
                    firstname: action?.payload?.firstname,
                    lastname: action?.payload?.lastname,
                    mobile: action?.payload?.mobile,
                    email: action?.payload?.email,
                    token: currentUserData?.token
                };
                localStorage.setItem("digiticToken", JSON.stringify(updatedUserData));
                state.user = JSON.parse(localStorage.getItem("digiticToken")) || null;
                if (state.isSuccess) {
                    toast.success("Profile Updated Successfully!");
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.forgotpasstoken = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Forgot Password Email Sent Successfully!");
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (!state.isSuccess) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(resetPassWord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassWord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.resetedpassword = action.payload;
                state.message = "success";
                if (state.isSuccess) {
                    toast.success("Password Updated Successfully!");
                }
            })
            .addCase(resetPassWord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (!state.isSuccess) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(emptyCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(emptyCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
                state.message = "success";
            })
            .addCase(emptyCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(resetState, () => initialState)
    }

});

export default authSlice.reducer;




