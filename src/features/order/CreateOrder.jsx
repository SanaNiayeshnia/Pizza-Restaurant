import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import InputBox from "../../ui/Input";
import FormField from "../../ui/FormField";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCartTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";
import store from "../../store.js";
import { clearCart } from "../cart/cartSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { cart } = useSelector((store) => store.cart);
  const { name } = useSelector((store) => store.user);
  const [firstname, setFirstname] = useState(name.split(" ")[0]);
  const cartTotalPrice = getCartTotalPrice(cart);
  const dispatch = useDispatch();
  const { address, status, error } = useSelector((store) => store.user);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (address) setUserAddress(`${address.city}, ${address.locality}`);
  }, [address]);

  return (
    <div className="mx-auto self-center">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="font-medium">
            {`You can't order with an empty cart! Start By adding items to your cart
          :)`}
          </p>
          <Button to="/menu">Back to Menu</Button>
        </div>
      ) : (
        <>
          <h2 className="mb-3 text-xl font-bold text-yellow-600 lg:text-2xl">{`Ready to order? Let's go!`}</h2>
          <Form method="POST" className="flex flex-col gap-2">
            <FormField label="First Name" htmlFor="fname">
              <InputBox
                type="text"
                id="fname"
                name="customer"
                required={true}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </FormField>

            <FormField label="Phone Number" htmlFor="phone">
              <InputBox type="tel" id="phone" name="phone" required={true} />
              {errors?.phone && (
                <p className="text-sm text-red-600">{errors.phone}</p>
              )}
            </FormField>

            <div className="grid items-center gap-2 ">
              <div
                className={`flex items-center justify-between ${!address && "py-1"}`}
              >
                <label htmlFor="address">Address</label>
                {!address && status === "idle" && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                    className="px-2 py-1 text-xs"
                  >
                    Get Position
                  </Button>
                )}

                {!address && status === "loading" && (
                  <img
                    className="w-10"
                    src="../../../public/Loader2.gif"
                    alt="loader"
                  />
                )}
              </div>
              <textarea
                name="address"
                id="address"
                cols="30"
                rows="5"
                className="rounded-xl px-2 py-1 shadow-md transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40"
                required
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              ></textarea>
              {error && !address && (
                <p className="text-sm text-red-600">
                  GeoLocation has been denied by the user!
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <label htmlFor="priority">
                Want to give your order priority?
              </label>
              <input
                type="checkbox"
                name="priority"
                id="priority"
                className="mb-[-5px] size-4 accent-yellow-500 "
              />
            </div>

            <input type="hidden" name="cart" value={JSON.stringify(cart)} />

            <Button disabled={isSubmitting} className="mt-2">
              {!isSubmitting
                ? `Order Now from ${formatCurrency(cartTotalPrice)}`
                : "creating your order"}
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export async function createOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Your phone number is incorrect!";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
