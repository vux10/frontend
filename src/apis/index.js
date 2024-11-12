import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

import { setNotification } from '../redux/slide/notificationSlice';

//import { API_ROOT } from '~/utils/constants'

// Category
export const fetchCategories = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/category/getAll")
    return response.data;
};

export const postCreateNewCategory = async (value) => {
    const response = await axios.post("http://localhost:5000/api/v1/category", value)
    return response.data;
};

export const putUpdateCategory = async (categoryId, value) => {
    const response = await axios.put(`http://localhost:5000/api/v1/category/${categoryId}`, value)
    return response.data;
};

export const deleteCategory = async (categoryId) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/category/${categoryId}`)
    return response.data;
};

// Product
export const fetchAllProductByCategoryId = async (categoryId) => {
    const response = await axios.get(`http://localhost:5000/api/v1/category/${categoryId}`)
    return response.data;
};

export const postCreateNewProduct = async (value) => {
    const response = await axios.post("http://localhost:5000/api/v1/product", value)
    return response.data;
};

export const putUpdateProduct = async (productId, value) => {
    const response = await axios.put(`http://localhost:5000/api/v1/product/${productId}`, value)
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/product/${productId}`)
    return response.data;
};

// Cart
export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async (product, {dispatch, rejectWithValue}) => {
        console.log("Dispatching addProductToCart with:", product);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/cart/add', product)
            console.log("API response:", response.data);
            dispatch(setNotification({ message: 'Add product to cart successfully', type:'success'}))
            return response?.data
        } catch (error) {
            console.error("API error:", error);
            dispatch(setNotification({ message: 'Error add product to cart', type: 'error'}))
            return rejectWithValue(error)
        }
    }
)

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (id) => {
        const response = await axios.get(`http://localhost:5000/api/v1/cart/${id}`)
        return response?.data
    }
)

export const updateProductQuantityInCart = createAsyncThunk(
    'cart/updateProductQuantityInCart',
    async ({ userId, productId, quantity }, { dispatch, rejectWithValue }) => {
        try {
            // Sending the updated quantity in a PUT request
            const response = await axios.put('http://localhost:5000/api/v1/cart/update', { userId, productId, quantity });
            console.log("API response:", response.data);
            
            // Show success notification
            dispatch(setNotification({ message: 'Product quantity updated successfully', type: 'success' }));

            // Return updated cart data or productId (depending on how you manage your state)
            return response?.data;
        } catch (error) {
            console.error("API error:", error);
            // Show error notification
            dispatch(setNotification({ message: 'Error updating product quantity', type: 'error' }));
            return rejectWithValue(error);
        }
    }
);

export const removeProductFromCart = createAsyncThunk(
    'cart/removeProductFromCart',
    async ({ userId, productId }, {dispatch, rejectWithValue}) => {
        // console.log("Dispatching addProductToCart with:", product);
        try {
            const response = await axios.delete('http://localhost:5000/api/v1/cart/remove', {
                data: { userId, productId }  // Correct way to send the data in DELETE request
            })
            console.log("API response:", response.data);
            dispatch(setNotification({ message: 'Remove product from cart successfully', type:'success'}))
            return productId
        } catch (error) {
            console.error("API error:", error);
            dispatch(setNotification({ message: 'Error remove product from cart', type: 'error'}))
            return rejectWithValue(error)
        }
    }
)
