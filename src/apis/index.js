import axios from 'axios'

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
