import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from "../features/customers/customerSlice";
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import pCategoryReducer from '../features/pCategory/pCategorySlice';
import colorReducer from '../features/color/colorSlice';
import blogReducer from '../features/blogs/blogSlice';
import bCategoryReducer from '../features/bCategory/bCategorySlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import imageReducer from '../features/image/imageSlice';
import couponReducer from '../features/coupon/couponSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        pCategory: pCategoryReducer,
        color: colorReducer,
        blog: blogReducer,
        bCategory: bCategoryReducer,
        enquiry: enquiryReducer,
        image: imageReducer,
        coupon: couponReducer,
    }
});



