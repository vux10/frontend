import axios from 'axios'

//import { API_ROOT } from '~/utils/constants'

// Category
export const fetchCategories = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/category/getAll")
    return response.data;
};

// Product
export const fetchAllProductByCategoryId = async (categoryId) => {
    const response = await axios.get(`http://localhost:5000/api/v1/category/${categoryId}`)
    return response.data;
};

// Board
// export const fetchBoardDetailAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
//   return response.data
// }

// export const updateBoardDetailAPI = async (boardId, updateData) => {
//   const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
//   return response.data
// }

// export const moveCardToDifferentColumnAPI = async (updateData) => {
//   const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
//   return response.data
// }

// // Column
// export const createNewColumnAPI = async (newColumnData) => {
//   const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
//   return response.data
// }

// export const updateColumnDetailAPI = async (columnId, updateData) => {
//   const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
//   return response.data
// }

// export const deleteColumnDetailAPI = async (columnId) => {
//   const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
//   return response.data
// }

// // Card
// export const createNewCardAPI = async (newCardData) => {
//   const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
//   return response.data
// }
