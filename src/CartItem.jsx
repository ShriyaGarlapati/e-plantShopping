import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  console.log("Cart Items:", cart);
  let totalAmount=0;
  //0: {name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', cost: '$15', quantity: 1}
  //1: {name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', cost: '$12', quantity: 1}
  //2: {name: 'Geraniums', image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg', cost: '$20', quantity: 1}
  //3: {name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', cost: '$13', quantity: 1}
  //length: 4
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    cart.forEach((item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      const itemTotal = costNumber * item.quantity;
  
      console.log("Item is:", item);
      console.log("Item total:", itemTotal);
  
      totalAmount += itemTotal;
      console.log("Total amount is:", totalAmount);
    });
  
    return totalAmount
  };

  const handleContinueShopping = (e) => {
    //e is short for event. When you click a button or interact with the page, the browser creates an event object that contains information about what just happened (like which button was clicked, key pressed, etc.).

    //In React, this is called a SyntheticEvent, and it wraps the native event to make it work consistently across all browsers.
    console.log("The event is: ",e);
    onContinueShopping(e);
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    console.log("Item in handleDecrrement is: ", item)
    console.log(item)
   if(item.quantity>1)
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  else
    dispatch(removeItem(item))
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    
      const costNumber = parseFloat(item.cost.replace('$', ''));
      const itemTotal = costNumber * item.quantity;
  
      console.log("Item is:", item);
      console.log("Item total:", itemTotal); 
      return itemTotal;
    
    
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;






//In JavaScript, forEach, map, and reduce are array methods used for iteration, but each serves a different technical purpose. forEach() is used for executing a function on each element of an array primarily for side effects (like logging or modifying external state); it does not return a new array and returns undefined. map() is used when you want to transform every element in an array and return a new array of the same length with the transformed values, making it ideal for data transformation. On the other hand, reduce() is used to accumulate or combine all elements of an array into a single value, such as a number, object, or string. It takes a callback with two main parameters: an accumulator and the current item, and an optional initial value. While forEach is best for tasks like printing or modifying external variables, map is suitable for creating new arrays with changes applied, and reduce is ideal for aggregating data like calculating sums, averages, or creating lookup tables from arrays. None of these methods mutate the original array.