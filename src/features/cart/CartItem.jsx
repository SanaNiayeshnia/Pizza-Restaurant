import propTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import { formatCurrency } from "../../utilities/helpers";
import QuantityChanger from "./QuantityChanger";

CartItem.propTypes = {
  item: propTypes.object,
};

function CartItem({ item }) {
  return (
    <li className="flex items-center justify-between gap-12 py-3">
      <p>{`${item.quantity} × ${item.name}`}</p>
      <div className="flex items-center gap-3">
        <p>{formatCurrency(item.totalPrice)}</p>
        <QuantityChanger id={item.pizzaId} />
        <DeleteButton id={item.pizzaId} className="hidden sm:inline-block" />
      </div>
    </li>
  );
}

export default CartItem;
