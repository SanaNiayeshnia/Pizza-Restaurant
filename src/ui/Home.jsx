import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const { name: username } = useSelector((store) => store.user);
  return (
    <div className="mx-auto self-center py-4">
      <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-left">
        The Best Pizza
      </h2>
      <div className="gap-1 text-center text-2xl font-bold text-yellow-600 sm:flex sm:text-left">
        <p> Starigh out of the oven,</p>
        <p>Straight to you.</p>
      </div>

      {!username ? (
        <CreateUser />
      ) : (
        <div className="mt-5 text-center sm:text-right">
          <Button to="/menu">Go to Menu</Button>
        </div>
      )}
    </div>
  );
}

export default Home;
