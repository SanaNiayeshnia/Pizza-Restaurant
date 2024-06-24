import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { useSelector } from "react-redux";

function Header() {
  const { name: username } = useSelector((store) => store.user);

  return (
    <header className="flex items-center justify-between space-x-4 bg-yellow-400 px-5 py-2.5">
      <Link
        to="/"
        className=" text-xl font-semibold tracking-widest text-gray-900 lg:text-2xl"
      >
        Pizza Restaurant
      </Link>
      <div className="flex items-center gap-3">
        <SearchOrder />
        {username && (
          <div className="font-medium">
            <Username />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
