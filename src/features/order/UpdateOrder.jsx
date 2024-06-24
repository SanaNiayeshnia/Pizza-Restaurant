import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import Loader from "../../ui/Loader";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      {fetcher.state == "loading" && <Loader />}
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function updateOrderAction({ params }) {
  const id = params.orderId;
  await updateOrder(id, { priority: true });
  return null;
}

export default UpdateOrder;
