import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData();
  return (
    <ul className="mx-auto w-screen divide-y-2 py-2 ">
      {menuData.map((item, index) => (
        <MenuItem
          item={item}
          index={index}
          itemsCount={menuData.length}
          key={item.id}
        />
      ))}
    </ul>
  );
}

export async function menuLoader() {
  const data = await getMenu();
  return data;
}

export default Menu;
