import { useState } from "react";
import { removeItem,addQty,decreaseQty } from "../utils/cartSlice";
import { useDispatch } from "react-redux";




function CartItem(props){
    const [qty,setQty] = useState(1);
    const dispatch = useDispatch();

function handleRemove(id){
        dispatch(removeItem(id));
    }

function addQuantity(item){

       dispatch(addQty(item))
    }
function minusQuantity(item) {
    dispatch(decreaseQty(item));
}


    return (
        <div className="border-2 border-gray-100 p-2 rounded-xl shadow-sm sm:flex gap-4 sm:w-auto">
            <div className="sm:w-[300px]">
                <img  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" src={props.data.thumbnail}></img>
            </div>
            <div className="flex flex-col w-[-webkit-fill-available] justify-between">
    <div className="p-6 flex justify-between ">
                <div className="flex flex-col justify-between h-[-webkit-fill-available]">
             <h2 className="text-xl font-bold text-pretty text-gray-700 mb-2">{props.data.title}</h2>
                <p className="text-sm text-gray-400">SKU : {props.data.sku}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{props.data.price}</h2>
                                
                </div>
            </div>

             <div className="p-6 flex justify-between w-[-webkit-fill-available]">
                <div className="flex justify-center items-center gap-2">
                                 <button  onClick={()=>{minusQuantity(props.data)}} className="px-2 text-center py-1 border-2 border-gray-300 rounded-md flex justify-center items-center text-gray-700">-</button>
                <p className="text-sm text-gray-400">Quantity : {props.data.quantity}</p>
                 <button onClick={()=>{addQuantity(props.data)}} className="px-2 text-center py-1 border-2 border-gray-300 rounded-md flex justify-center items-center text-gray-700">+</button>
                </div>
                <div> 
                   <button onClick={()=>{handleRemove(props.data.id)}} className="text-red-800 font-semibold cursor-pointer">Remove</button>
                </div>
            </div>
            </div>
        
            

        </div>
    )
}

export default CartItem;