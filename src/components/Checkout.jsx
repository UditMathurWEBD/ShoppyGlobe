import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/"); 
    }
  }, [cartItems, navigate, orderPlaced]);

  useEffect(() => {
    const result = cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    setTotalAmount(result);
  }, [cartItems]);

  function handlePlaceOrder() {
    setOrderPlaced(true);
    dispatch(clearCart());

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-600 text-md">Your order has been placed successfully. You will be redirected to the homepage shortly.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-20">
      <div className="w-max border-2 border-gray-100 p-8 rounded-xl shadow-sm sm:h-fit">
        <h2 className="font-semibold text-2xl">Shopping cart</h2>
        <p className="mb-8 text-sm mt-2 text-gray-500">
          All your selected items are present here. Click on Checkout to buy your items.
        </p>
        <hr className="border-gray-200 mb-6" />
        <div className="mb-8">
          <input type="text" placeholder="Full Name" className="mb-2 w-full p-2 border rounded" />
          <input type="text" placeholder="Shipping Address" className="mb-2 w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="mb-4 w-full p-2 border rounded" />
        </div>

        {cartItems.map((item) => (
          <div key={item.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-md font-bold text-pretty text-gray-700 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-400">QTY : {item.quantity}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </h2>
              </div>
            </div>
            <hr className="border-gray-200 mb-6 mt-6" />
          </div>
        ))}

        <div className="flex justify-between items-start">
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-md font-bold text-pretty text-gray-700 mb-2">Subtotal</h2>
            <p className="text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">${totalAmount.toFixed(2)}</h2>
          </div>
        </div>
        <hr className="border-gray-200 mb-6 mt-6" />
        <button
          onClick={handlePlaceOrder}
          className="mt-4 cursor-pointer p-4 w-full bg-pink-700 rounded-xl border-0 text-white"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
