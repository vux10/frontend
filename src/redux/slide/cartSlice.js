import { createSlice } from "@reduxjs/toolkit";

import { addProductToCart, getCart, removeProductFromCart, updateProductQuantityInCart } from "../../apis";

const initialState = {
  items: [],
  status: null,
  error: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'failed'
        state.items = action.error.message
      })
      .addCase(getCart.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = 'failed'
        state.items = action.error.message
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the product from the cart using the productId
        console.log('state.items: ', state.items.products)
        console.log('state.items JSON:', JSON.stringify(state.items.products));
        console.log('action.payload: ', action.payload)
        state.items.products = state.items.products.filter(
          (item) => item.productId._id !== action.payload 
        );
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProductQuantityInCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductQuantityInCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Find the product and update its quantity in the state
        const updatedCart = action.payload;
        state.items = updatedCart.products;
      })
      .addCase(updateProductQuantityInCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
})

// const { removeProductFromCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export { cartReducer }
