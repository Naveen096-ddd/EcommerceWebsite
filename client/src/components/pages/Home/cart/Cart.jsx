import { useCart } from "../../../context/CartContext";


const Cart = () => {
  const { cartItems } = useCart();

  console.log("CART ITEMS:", cartItems); // DEBUG

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      {cartItems.map((item) => (
        <div key={item.id} className="bg-white p-4 shadow rounded mb-4">
          <h2 className="font-semibold text-xl">{item.name}</h2>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p className="font-bold">
            Total: ₹{item.price * item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cart;

