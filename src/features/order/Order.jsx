import { useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";

import UpdateOrder from "./UpdateOrder";

function Order() {
  const orderData = useLoaderData();
  const { priority, status, estimatedDelivery, orderPrice, priorityPrice } =
    orderData;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="flex w-screen items-center justify-center">
      <div className="w-full md:w-4/5 lg:w-3/5">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h2 className="text-xl font-semibold">
            Order #{orderData.id} Status
          </h2>
          <div className="flex items-center gap-2">
            {priority && (
              <p className="rounded-full bg-red-500 px-3 py-1 text-sm uppercase text-white">
                Priority
              </p>
            )}
            <p
              className={`text-sm uppercase ${status === "delivered" ? "bg-green-500" : "bg-blue-500"}  rounded-full px-3 py-1 text-white`}
            >
              {status} order
            </p>
          </div>
        </div>

        <div className="my-3 flex flex-col justify-between rounded bg-stone-200 px-5 py-4 tracking-wider sm:flex-row">
          <p>
            {deliveryIn > 0
              ? `Only ${deliveryIn} minutes left:`
              : "order should have arrived"}
          </p>
          <p className="text-sm sm:text-base">
            (Estimated Delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>
        <ul className="my-10 divide-y px-5">
          {orderData.cart.map((item) => (
            <li key={item.pizzaId} className="flex justify-between py-3">
              <p>
                {item.quantity} × {item.name}
              </p>
              <p>{formatCurrency(item.totalPrice)}</p>
            </li>
          ))}
        </ul>
        <div className="my-3 rounded bg-stone-200 px-5 py-4 tracking-wider">
          <p>Pizza Price: {formatCurrency(orderPrice)}</p>
          {priority && <p>Priority Price:{formatCurrency(priorityPrice)}</p>}
          <p>
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>

        {status !== "delivered" && !priority && <UpdateOrder />}
      </div>
    </div>
  );
}

export async function orderLoader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}

export default Order;
