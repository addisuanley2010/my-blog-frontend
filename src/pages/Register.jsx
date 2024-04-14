import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../utl/Button";
import axios from "axios";
import { BASE_URL } from "../utl/config";
import { toast } from "react-toastify";
const Register = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, seterror] = useState("");

  const handleInputCahnge = (e) => {
    setuser((prevstate) => {
      return { ...prevstate, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {

    try {
      const response = await axios.post(`${BASE_URL}/users/register`, user);

      const newUserData = await response.data;
      if (newUserData.success) {
        toast.success(newUserData.success, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });

        navigate("/login");
      } else {
        toast.error(newUserData.message, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="max-md:mt-12 mt-16 pt-2  px-3 flex flex-col items-center ">
      <div className="flex flex-col">
        <span className="text-sky-600 text-2xl mt-4 mb-6">Sign Up</span>
        {error && <span className="text-red-600 ">{error} </span>}
      </div>

      <div className="flex flex-col">
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <Button handleSubmit={handleSubmit} />
      </div>
      <span className="text-sm  mb-4">
        Already have an Account ?{" "}
        <Link to={"/login"} className="text-sky-500 underline px-4">
          sign in
        </Link>
      </span>
    </div>
  );
};

export default Register;
