import { createSlice } from "@reduxjs/toolkit";

type Cart = {
  products: [];
  availableShippingMethods: [];
  chosenShippingMethods: String;
  subtotal: String;
  shippingTotal: String;
  total: String;
};
const initialState: { value: Cart } = {
  value: {
    products: [],
    availableShippingMethods: [],
    chosenShippingMethods: "",
    subtotal: "N/A",
    shippingTotal: "N/A",
    total: "N/A",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = cartSlice.actions;

export default cartSlice.reducer;
