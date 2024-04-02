const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;
    // console.log(
    //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    //   product
    // );

    // Tackle the existing product

    let existingProduct=state.cart.find(
      (curItem) => curItem.id === id && curItem.color === color
      );

    console.log(
          "🚀 ~ file: cartReducer.js ~ line 15 ~ cartReducer ~ existingProduct",
          existingProduct
    );

    if(existingProduct){
        let updatedProduct=state.cart.map((curElem)=>{
          if (curElem.id === id && curElem.color === color){
            let newAmt=curElem.amount+amount;
  
            if (newAmt>=curElem.max){
              newAmt=curElem.max;   
            }
            return{
              ...curElem,
                amount:newAmt,
            };
          }
          else{
            return curElem;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        }; 
    }
    else{
      let cartProduct;

      cartProduct = {
        id: id,
        color:color,
        name: product.name,
        amount:amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // To set increment and decrement
  if (action.type === "SET_DECREMENT") {
    let updatedProduct=state.cart.map((curElem)=>{
      if (curElem.id==action.payload){
        let decAmt=curElem.amount-1;

        if (decAmt<=1){
          decAmt=1;
        }
        return {
          ...curElem,
          amount:decAmt,
        };
      }
      else{
        return curElem;
      }
    });
    return {...state,cart:updatedProduct};
  }
  
  if (action.type === "SET_INCREMENT") {
    let updatedProduct=state.cart.map((curElem)=>{
      if (curElem.id==action.payload){
        let incAmt=curElem.amount+1;

        if (incAmt>=curElem.max){
          incAmt=curElem.max;
        }
        return {
          ...curElem,
          amount:incAmt,
        };
      }
      else{
        return curElem;
      }
    });
    return {...state,cart:updatedProduct};
  }


  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  // To empty / clear the cart
  if (action.type === "CLEAR_CART"){
    return {
      ...state,
      cart:[],
    }
  }

  if(action.type ==="CART_TOTAL_ITEM"){
    let updatedItemval=state.cart.reduce((initialVal,curElem)=>{
      let {amount}=curElem;
  
      initialVal= initialVal+ amount;
      return initialVal;
    },0);
  
    return{
      ...state,
      total_item: updatedItemval,
    }
  }

  if(action.type ==="CART_TOTAL_PRICE"){
    let total_price=state.cart.reduce((initialVal,curElem)=>{
      let {price,amount}=curElem;
      initialVal= initialVal+ price*amount;

      return initialVal;
    },0);

    return{
      ...state,
      total_price:total_price,
    };
  }

  return state;
};

export default cartReducer;
