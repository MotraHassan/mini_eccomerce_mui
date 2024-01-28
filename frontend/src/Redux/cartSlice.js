import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: JSON.parse(localStorage.getItem("selectedProducts")) || [],
  selectedProductsID:
    JSON.parse(localStorage.getItem("selectedProductsID")) || [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productQ = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productQ);
      state.selectedProductsID.push(action.payload.id);

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
    addQuantity: (state, action) => {
      const increaseProduct = state.selectedProducts.find((product) => {
        return product.id === action.payload.id;
      });
      increaseProduct.quantity += 1;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    decreaseQuantity: (state, action) => {
      const increaseProduct = state.selectedProducts.find((product) => {
        return product.id === action.payload.id;
      });

      increaseProduct.quantity -= 1;
      if (increaseProduct.quantity === 0) {
        const newArray = state.selectedProducts.filter((el) => {
          return el.id !== action.payload.id;
        });
        const newArray2 = state.selectedProductsID.filter((el) => {
          return el !== action.payload.id;
        });

        state.selectedProducts = newArray;
        state.selectedProductsID = newArray2;

        localStorage.setItem(
          "selectedProducts",
          JSON.stringify(state.selectedProducts)
        );
        localStorage.setItem(
          "selectedProductsID",
          JSON.stringify(state.selectedProductsID)
        );
      }
    },
    deleteProduct: (state, action) => {
      const newArray = state.selectedProducts.filter((el) => {
        return el.id !== action.payload.id;
      });
      const newArray2 = state.selectedProductsID.filter((el) => {
        return el !== action.payload.id;
      });
      state.selectedProducts = newArray;
      state.selectedProductsID = newArray2;

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },
  },
});

export const { addToCart, addQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
