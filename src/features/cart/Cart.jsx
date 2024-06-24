import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Username from "../user/Username";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart, getCartTotalPrice, getPizzasCount } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function Cart() {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const cartTotalPrice = getCartTotalPrice(cart);
  const pizzasCount = getPizzasCount(cart);

  function handleClearCart(e) {
    e.preventDefault();
    dispatch(clearCart());
  }

  return (
    <div className="flex w-screen flex-col items-center justify-center py-2">
      <Link to="/menu" className="z-10 self-start text-sky-600">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Menu
      </Link>
      <div className="mt-[-2rem] flex h-full w-full flex-col justify-center sm:w-4/5 md:w-3/5 lg:w-1/2 ">
        <h2 className="flex gap-1  border-b-2 border-yellow-400 pb-5 text-xl font-bold">
          Your Cart, {<Username />}
        </h2>

        {cart.length === 0 ? (
          <>
            <p className="pt-5">{`It's Empty! Start by adding item to your cart :)`}</p>
          </>
        ) : (
          <>
            <ul className="divide-y">
              {cart.map((item) => (
                <CartItem key={item.pizzaId} item={item} />
              ))}
            </ul>
            <p className=" mt-20 text-center font-semibold">
              {pizzasCount} Pizzas, Total Price:{" "}
              {formatCurrency(cartTotalPrice)}
            </p>

            <div className="mt-5 space-x-2 self-center">
              <Button className=" uppercase" to="/order/new">
                Order Pizzas
              </Button>
              <button
                onClick={handleClearCart}
                className=" rounded-full border-2 border-stone-300 px-3 py-[0.4rem] uppercase text-stone-400 transition-all duration-300 hover:bg-stone-300 hover:text-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-300 focus:ring-opacity-40 focus:ring-offset-2"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
