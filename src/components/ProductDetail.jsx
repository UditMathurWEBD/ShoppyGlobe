import useFetchProducts from "../utils/useFetchProducts"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addQty,decreaseQty,addItem } from "../utils/cartSlice";

export default function ProductDetail() {
      const dispatch = useDispatch();
  const { id: productId } = useParams();
  const { data, loading, error } = useFetchProducts(`https://dummyjson.com/products/${productId}`);
  const cartItems = useSelector((store)=> store.cart.items);
  const productInCart = cartItems.find(item => item.id === Number(productId));
  const quantity = productInCart ? productInCart.quantity : 0;

function addQuantity(item){
 dispatch(addQty(item))
    }
function minusQuantity(item) {
    dispatch(decreaseQty(item));
}
  function handleAddCart(data) {
      dispatch(addItem({quantity: 1,...data}));
  }



  if (loading) return <p className="p-8 text-lg font-semibold">Loading...</p>;
  if (error) return <p className="p-8 text-lg text-red-600">Error: {error}</p>;
  if (!data) return null; 

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
            <button className="text-sm mb-6 p-2 bg-green-100 rounded-md">{data.availabilityStatus}</button>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h2>
          <p className="mt-4 text-gray-500">{data.description}</p>
          {quantity > 0 ? <div className="flex justify-between w-[-webkit-fill-available] mt-8">
                <div className="flex justify-center items-center gap-2">
                  <button onClick={()=>{minusQuantity(data)}}  className="px-2 text-center py-1 border-2 border-gray-300 rounded-md flex justify-center items-center text-gray-700">-</button>
                <p className="text-sm text-gray-400">Quantity :{quantity}</p>
                 <button onClick={()=>{addQuantity(data)}}   className="px-2 text-center py-1 border-2 border-gray-300 rounded-md flex justify-center items-center text-gray-700">+</button>
                </div>
            </div> : <button    className={"bg-pink-700 mt-6 text-[12px] text-white border px-4 py-2 rounded hover:bg-pink-700 hover:border-0 hover:text-white" }
            onClick={()=>{
          handleAddCart(data);
        }}>Add to cart</button>  
      }
          

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Brand</dt>
              <dd className="mt-2 text-sm text-gray-500">{data.brand}</dd>
            </div>
              <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Return Policy</dt>
              <dd className="mt-2 text-sm text-gray-500">{data.returnPolicy}</dd>
            </div>
                <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Return Policy</dt>
              <dd className="mt-2 text-sm text-gray-500">{data.returnPolicy}</dd>
            </div>
               <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">SKU</dt>
              <dd className="mt-2 text-sm text-gray-500">{data.sku}</dd>
            </div>
            
          </dl>
        </div>
        {(data.images.length > 1) ? 
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          {data.images?.map((img, index) => (
            <img
       
              key={index}
              alt={data.title}
              src={img}
              className="rounded-lg bg-gray-100 object-cover"
            />
          ))}
        </div> : <div>
               <img
         
              alt={data.title}
              src={data.images[0]}
              className="rounded-lg bg-gray-100 object-cover"
            />
             </div>}

     
      </div>
    </div>
  );
}
