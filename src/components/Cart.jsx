import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart(){
    const cartItems = useSelector((store)=> store.cart.items)

    const [totalAmount,setTotalAmount] = useState(0);
useEffect(()=>{
   const result =  cartItems.reduce((acc,curr)=>{
        return acc = acc + (curr.quantity*curr.price);
    },0);
    setTotalAmount(result);
},[cartItems])


    if(cartItems.length >=1 ){
   return (
        <div className="p-6 sm:px-40 sm:py-20 md:p-10">
        <h1 className="text-black font-bold text-4xl text-pretty mb-4">Your Cart !</h1>
        <p className="mb-8">All your selected items are present here. Click on Checkout to buy your items .</p>
        <div className="sm:flex sm:gap-6 md:flex-wrap lg:flex-nowrap">
     <div className="flex flex-col gap-4 mb-8">
        {cartItems.map((item)=>{
     return<CartItem key={item.id} data={item} />
        })}
        </div>



        <div className="md:w-max border-2 border-gray-100 p-8 rounded-xl shadow-sm sm:h-fit ">
            <h2 className="font-semibold text-2xl">Shopping cart</h2>
        <p className="mb-8 text-sm mt-2 text-gray-500">All your selected items are present here. Click on Checkout to buy your items .</p>
        <hr className="border-gray-200 mb-6"></hr>
            {cartItems.map((item)=>{
     return   <div key={item.id} className="card">
    <div className="flex justify-between items-start">
                <div className="flex flex-col justify-between h-[-webkit-fill-available] md:w-[-webkit-fill-available]">
             <h2 className="text-md font-bold text-pretty text-gray-700 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-400">QTY : {item.quantity}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">${(item.price*item.quantity).toFixed(2)}</h2>
                </div>
            </div>
              <hr className="border-gray-200 mb-6 mt-6"></hr>
        </div>
        })}
  
        
           <div className="flex justify-between items-start">
                <div className="flex flex-col justify-between h-[-webkit-fill-available]">
             <h2 className="text-md font-bold text-pretty text-gray-700 mb-2">Subtotal</h2>
                <p className="text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">${totalAmount.toFixed(2)}</h2>
                </div>
            </div>
            <hr className="border-gray-200 mb-6 mt-6"></hr>
            <Link to="/checkout">
                <button className="mt-4 cursor-pointer p-4 w-[-webkit-fill-available] bg-pink-700 rounded-xl  border-0 text-white" >Checkout</button>
            </Link>
    
      
        </div>
        </div>
   
        </div>
    )
    }else{
        return (
            <div className="text-center flex flex-col h-[80vh] justify-center items-center">
                    <h1 className="text-black font-bold text-4xl text-pretty mb-4">Your Cart is empty !</h1>
        <p className="mb-8">Please add items in your cart to view.</p>
        <Link
              to="/"
              className="w-max rounded-md bg-pink-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            </div>
        )
    }
 
}


export default Cart;