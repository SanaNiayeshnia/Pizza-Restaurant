import { useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  return <div>An Error occurred: {error.data || error.message}</div>;
}

export default Error;
