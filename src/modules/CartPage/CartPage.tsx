import { useShop } from '../../context/ShopContext';

export const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useShop();

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return <h1>Your cart is empty</h1>;
  }

  return (
    <>
      {cart.map(item => (
        <div className="cartItem" key={item.product.id}>
          <h2>{item.product.name}</h2>
          <img src={item.product.image} alt={item.product.name} />
          <p>{item.product.price}</p>
          <p>{item.quantity}</p>
          <button
            type="button"
            onClick={() => increaseQuantity(item.product.id)}
          >
            +
          </button>

          <button
            type="button"
            onClick={() => decreaseQuantity(item.product.id)}
          >
            -
          </button>
          <button type="button" onClick={() => removeFromCart(item.product.id)}>
            remove
          </button>
        </div>
      ))}
      <div className="cart-total">
        <p>Total items: {totalQuantity}</p>
        <p>Total price: ${totalPrice}</p>
      </div>
    </>
  );
};
