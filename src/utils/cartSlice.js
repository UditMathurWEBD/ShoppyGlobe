import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name : "Cart",
    initialState : {
        items : []
    },
    reducers : {
        addItem : (state,action) => {
            state.items.unshift(action.payload);
        },
        removeItem : (state,action)=>{
         
          const removeditem =  state.items.findIndex((item)=>{
               return item.id ==  action.payload;
            })
            state.items.splice(removeditem,1);
          // console.log(action.payload);
        },
       addQty: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        },
     decreaseQty: (state, action) => {
  const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
  if (itemIndex !== -1) {
    if (state.items[itemIndex].quantity === 1) {
      state.items.splice(itemIndex, 1);
    } else {
      state.items[itemIndex].quantity -= 1;
    }
  }
},
clearCart: (state) => {
  state.items = [];
}

    }
})


export const {addItem,removeItem,addQty,decreaseQty,clearCart} =  cartSlice.actions;
export default cartSlice.reducer;