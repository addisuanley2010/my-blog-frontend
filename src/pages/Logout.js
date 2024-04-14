import  { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);
  setCurrentUser(null);
  navigate("/login");
};

export default Logout;
