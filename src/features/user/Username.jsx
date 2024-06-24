import { useSelector } from "react-redux";

function Username() {
  const { name } = useSelector((store) => store.user);
  return <p className="hidden sm:block">{name.split(" ")[0]}</p>;
}

export default Username;
