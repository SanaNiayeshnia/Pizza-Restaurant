import { useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        navigate(`order/${query}`);
        setQuery("");
      }}
    >
      <input
        type="text"
        className="w-28 rounded-full bg-yellow-50 px-3 py-1.5 text-sm transition-all duration-300 focus:w-32 focus:outline-none focus:ring focus:ring-yellow-500  sm:w-60 sm:text-base sm:focus:w-80"
        placeholder="Search order id"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
