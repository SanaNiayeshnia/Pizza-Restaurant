import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import propTypes from "prop-types";

DeleteButton.propTypes = {
  id: propTypes.number,
};

function DeleteButton({ id }) {
  const dispatch = useDispatch();

  function handleDeleteItem(e) {
    e.preventDefault();
    dispatch(deleteItem(id));
  }

  return (
    <Button
      className={`hidden text-xs font-medium uppercase sm:inline-block sm:text-sm`}
      onClick={handleDeleteItem}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
