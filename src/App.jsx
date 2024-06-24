import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu, { menuLoader } from "./features/menu/Menu";
import Order, { orderLoader } from "./features/order/Order";
import CreateOrder, { createOrderAction } from "./features/order/CreateOrder";
import Cart from "./features/cart/Cart";
import Error from "./ui/Error";
import PageNotFound from "./ui/PageNotFound";
import { updateOrderAction } from "./features/order/UpdateOrder";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
        },
        { path: "/order", element: <Navigate to="/order/new" replace /> },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: "order/:orderId",
          element: <Order />,
          loader: orderLoader,
          action: updateOrderAction,
        },
        { path: "cart", element: <Cart /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
