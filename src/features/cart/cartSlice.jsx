import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity + 1 <= 30) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity - 1 > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      } else if (item.quantity - 1 === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

function getCartTotalPrice(cart) {
  return cart.reduce((total, item) => (total += item.totalPrice), 0);
}
function getPizzasCount(cart) {
  return cart.reduce((count, item) => (count += item.quantity), 0);
}

function getItemQuantity(cart, id) {
  const cartItem = cart.find((item) => item.pizzaId === id);
  return cartItem?.quantity;
}

function isInCart(cart, item) {
  const i = cart.findIndex((cartItem) => cartItem.pizzaId == item.id);
  return i >= 0 ? true : false;
}

export default cartSlice.reducer;
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export { getCartTotalPrice, getPizzasCount, isInCart, getItemQuantity };
