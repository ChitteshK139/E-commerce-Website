import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData=()=>{
  let newCartData=localStorage.getItem("Ecommerce Cart");

  if(newCartData==[]){
    return [];
  }
  else{
    return JSON.parse(newCartData);
  }
}

const initialState = {
  //cart: [],
  cart:getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 15000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // Increment and decrement

  const setDecrease=(id)=>{
    dispatch({type:"SET_DECREMENT",payload:id});
  }

  const setIncrease=(id)=>{
    dispatch({type:"SET_INCREMENT",payload:id});  
  }

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // To clear the cart

  const clearCart=()=> {
    dispatch({type:"CLEAR_CART"})
  }

  // To add the data in local storage
  //get vs set

  useEffect(()=>{
    dispatch({type:"CART_TOTAL_ITEM"});
    dispatch({type:"CART_TOTAL_PRICE"});
    localStorage.setItem("Ecommerce Cart", JSON.stringify(state.cart))
  },[state.cart])

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
