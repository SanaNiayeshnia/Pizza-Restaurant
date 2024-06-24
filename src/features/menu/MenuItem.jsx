import propTypes from "prop-types";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, isInCart } from "../cart/cartSlice";
import { useEffect, useState } from "react";
import DeleteButton from "../cart/DeleteButton";
import QuantityChanger from "../cart/QuantityChanger";

MenuItem.propTypes = {
  item: propTypes.object,
  index: propTypes.number,
  itemsCount: propTypes.number,
};

function MenuItem({ item, index, itemsCount }) {
  const { id, name, soldOut, imageUrl, unitPrice, ingredients } = item;
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const [isIncart, setIsIncart] = useState(false);

  useEffect(() => {
    setIsIncart(isInCart(cart, item));
  }, [cart, item]);

  function handleAddToCart(e) {
    const newCartItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    e.preventDefault();
    dispatch(addItem(newCartItem));
  }

  return (
    <div className={`flex gap-4 py-3 ${index == itemsCount - 1 && "pb-5"}`}>
      <img
        src={imageUrl}
        alt={name}
        className={`max-h-28 max-w-28 self-center rounded-sm sm:max-h-36 sm:max-w-36 lg:max-h-44 lg:max-w-44 ${soldOut && "grayscale"}`}
      />
      <div className="flex w-full flex-col justify-between gap-3">
        <div>
          <p className="text-base font-medium sm:text-lg ">{name}</p>
          <p className="text-sm italic text-stone-600 sm:text-base">
            {ingredients.map((ing, index) => (
              <span key={index}>
                {ing}
                {index != ingredients.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={`text-sm font-semibold sm:text-base ${soldOut && "text-stone-600 "}`}
          >
            {soldOut ? "SOLD OUT" : formatCurrency(unitPrice)}
          </p>
          {!soldOut && !isIncart && (
            <Button
              className="text-xs font-medium uppercase sm:text-sm"
              onClick={handleAddToCart}
            >
              <i className="fa-solid fa-plus sm:hidden"></i>
              <span className="hidden sm:inline-block">add to cart</span>
            </Button>
          )}
          {!soldOut && isIncart && (
            <div className="flex items-center gap-3">
              <QuantityChanger id={id} />
              <DeleteButton id={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
