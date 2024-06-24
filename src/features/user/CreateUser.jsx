import { useEffect, useState } from "react";
import InputBox from "../../ui/Input";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { signin } from "./userSlice";
import { useNavigate } from "react-router";

function CreateUser() {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [nameInput, setNameInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    dispatch(signin(nameInput));
    setNameInput("");
    navigate("/menu");
  }

  useEffect(() => {
    if (nameInput !== "") setIsInputEmpty(false);
    else setIsInputEmpty(true);
  }, [nameInput]);

  return (
    <form className="mt-3 space-y-3">
      <p className="text-center text-lg sm:text-left">
        👋Welcome! Please start by telling us your name
      </p>

      <InputBox
        type="text"
        placeholder="Your full name"
        className="w-full px-4 py-3"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      {!isInputEmpty && (
        <div className="text-center sm:text-right ">
          <Button className="mt-2" onClick={handleSignIn}>
            Start Ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
