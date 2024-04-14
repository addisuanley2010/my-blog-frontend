import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../utl/Button";
import { BASE_URL } from "../utl/config";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
const [loading, setloading] = useState(false)


const {setCurrentUser}=useContext(UserContext)

  const userData = {
    email,
    password,
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, userData);
      const newUserData = await response.data;
      setCurrentUser(newUserData)
      if (newUserData.message) {
        toast.error(newUserData.message, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
      } else {
        toast.success(newUserData.success, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };


  return (
    <div className="max-md:mt-12 mt-16 pt-2  px-3 flex flex-col items-center">
      <div className="flex flex-col">
        <span className="text-sky-600 text-2xl my-2">Sign in</span>
        {error && <span className={" text-red-600"}>{error} </span>}
      </div>

      <div className="flex flex-col">
        <input
          autoFocus
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />

        <Button handleSubmit={handleSubmit} />
      </div>
      <span className="text-sm  mb-4">
        Don't' have an Account ?{" "}
        <Link to={"/register"} className="text-sky-500 underline px-4">
          sign up
        </Link>
      </span>
    </div>
  );
};

export default Login;
