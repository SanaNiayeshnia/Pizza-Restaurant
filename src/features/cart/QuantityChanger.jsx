import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  getItemQuantity,
} from "./cartSlice";
import propTypes from "prop-types";

QuantityChanger.propTypes = {
  id: propTypes.number,
};

function QuantityChanger({ id }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const quantity = getItemQuantity(cart, id);

  return (
    <div className="flex min-w-[6.5rem] items-center justify-between gap-2">
      <Button
        className="text-xs"
        onClick={(e) => {
          e.preventDefault();
          dispatch(increaseItemQuantity(id));
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </Button>
      <p>{quantity}</p>
      <Button
        className="text-xs"
        onClick={(e) => {
          e.preventDefault();
          dispatch(decreaseItemQuantity(id));
        }}
      >
        <i className="fa-solid fa-minus text-xs"></i>
      </Button>
    </div>
  );
}

export default QuantityChanger;
