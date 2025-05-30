import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addItem,removeItem } from "../utils/cartSlice";
import { useState } from "react";


function ProductItem(props) {
 const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isAdded = cartItems.some(item => item.id === props.data.id); 

  function handleAddCart(data) {
    if (isAdded) {
      dispatch(removeItem(data.id));
    } else {
      dispatch(addItem({quantity: 1,...data}));
    }
  }

  return (
    <div className="group relative">
         <Link to={`/product/${props.data.id}`} className="hover:underline">
      <img
        alt={props.data.title || "Product Image"}
        src={props.data.thumbnail}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg";
        }}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      </Link>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-700 font-semibold">
            {/* ✅ Only the title is clickable */}
            <Link to={`/product/${props.data.id}`} className="hover:underline">
              {props.data.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">$ {props.data.price}</p>
        </div>

        {/* Add to Cart button stays independent */}
        <button onClick={()=>{
          handleAddCart(props.data);
        }}
         className={isAdded ? "bg-pink-700 text-[12px] text-white border px-2 py-1 rounded hover:bg-pink-700 hover:border-0 hover:text-white" : "text-[12px] bg-white text-black border px-2 py-1 rounded hover:bg-pink-700 hover:border-0 hover:text-white"}>
         {isAdded ? "Remove from Cart" : "Add to Cart"} 
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
