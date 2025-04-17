import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Destructure the payload to get the product's name, image, and cost
      const { name, image, cost } = action.payload;
    
      // Check if the product already exists in the cart (by name)
      const existingItem = state.items.find(item => item.name === name);
    
      
        // 🚀 If the item is NOT in the cart yet, add it as a new item with quantity = 1
        state.items.push({
          name,        // product name
          image,       // product image URL or file path
          cost,        // product price
          quantity: 1  // default quantity for newly added items
        });
      
    },
    
    removeItem: (state, action) => {
      // Destructure the payload to get the product's name, image, and cost
      const { name, image, cost } = action.payload;
    
      // Check if the product already exists in the cart (by name)
      const existingItemIndex = state.items.findIndex(item => item.name === name);
      const existingItem = state.items.find(item => item.name === name);

      
        //array.splice(startIndex, deleteCount)
        //existingItemIndex is the index of the product to remove.

        //1 means: remove exactly one item at that index.
        state.items.splice(existingItemIndex, 1);

      
    },
    updateQuantity: (state, action) => {
      // Destructure the payload to get the product's name, image, and cost
      // names inside the { } should match with the names in CartItem.jsx
      const { name, image, cost, quantity } = action.payload;
    
      // Check if the product already exists in the cart (by name)
      const existingItemIndex = state.items.findIndex(item => item.name === name);
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // ✅ If the item is already in the cart, just increase its quantity by 1
        existingItem.quantity=quantity;
      } else {

        console.print("Item does not exist to print quantity")

      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
