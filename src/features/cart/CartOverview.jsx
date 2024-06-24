import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utilities/helpers";
import { getCartTotalPrice, getPizzasCount } from "./cartSlice";

function CartOverview() {
  const { cart } = useSelector((store) => store.cart);
  const pizzasCount = getPizzasCount(cart);
  const cartTotalPrice = getCartTotalPrice(cart);

  return (
    <div className="flex items-center justify-between bg-stone-700 px-5 py-2 text-stone-100">
      <div className="flex items-center gap-3">
        <p className="text-lg">{pizzasCount} Pizzas</p>
        <p className="text-lg uppercase">{formatCurrency(cartTotalPrice)}</p>
      </div>
      <Link to="/cart" className="flex items-center gap-2 text-lg">
        Open Cart <i className="fa-solid fa-arrow-right mb-[-5px]"></i>
      </Link>
    </div>
  );
}

export default CartOverview;
