import { Outlet, useLocation, useNavigation } from "react-router";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { cart } = useSelector((store) => store.cart);
  const location = useLocation();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <main className="flex overflow-auto bg-stone-50 px-5">
        <Outlet />
      </main>

      {cart.length > 0 && location.pathname !== "/cart" && <CartOverview />}
    </div>
  );
}

export default AppLayout;
