import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../utl/config";
import { toast } from "react-toastify";
import Loader from "./Loader";
import UploadImage from "./UploadImage";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const [imagePath, setimagePath] = useState('')
  const [user, setuser] = useState({
    name: '',
    email:'',
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState("");

  const token = currentUser?.token;

  const email = currentUser?.email;
    const id = currentUser?.id;

  const tok = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchPosts = async () => {
        setloading(true);
        try {
          const response = await axios.get(`${BASE_URL}/users/${id}`,{
          headers: {
            Authorization: `Bearer ${tok.token}`,
          },
        });
          setuser(response?.data.user);
          setimagePath(response?.data.user.imagePath)
        } catch (error) {
          console.log(error.message);
        }
        setloading(false);
      };

      fetchPosts();
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleInputCahnge = (e) => {
    setuser((prevstate) => {
      return { ...prevstate, [e.target.name]: e.target.value };
    });
  };
  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/edit-profile`,
        { name: user.name, email: user.email },
        {
          headers: {
            Authorization: `Bearer ${tok.token}`,
          },
        }
      );
      const newUserData = await response.data;
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
      }
    } catch (error) {
      seterror(error.message,'tttttttttttttt');
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/edit-password`,
        {
          currentPassword: user.password,
          newPassword: user.newPassword,
          confirmNewPassword: user.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${tok.token}`,
          },
        }
      );
      const newUserData = await response.data;
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
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="   max-md:mt-12 mt-16 pt-2  px-3 flex flex-col items-center ">
      <Link
        to={"/mypost"}
        className=" border px-4 py-0 md:py-1 rounded-md hover:bg-gray-900 hover:text-white my-0 md:my-4 italic"
      >
        My Post
      </Link>


      <UploadImage token={token} imagePath={imagePath}/>
   
      <div className="flex flex-col">
        {error && (
          <p className={`text-red-500 italic text-xs px-16 items-center `}>
            {error}
          </p>
        )}
        <input
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
        />{" "}
        <button
          className="border bg-green-800 w-fit text-slate-200 italic rounded-md px-4 py-1 mb-4 hover:bg-green-600 hover:text-white hover:scale-105 items-center ml-4"
          onClick={updateProfile}
        >
          update
        </button>
        <input
          type="password"
          placeholder="current password"
          name="password"
          value={user.password}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <input
          type="password"
          placeholder="new passwoord"
          name="newPassword"
          value={user.newPassword}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
        <input
          type="password"
          placeholder=" confirm password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputCahnge}
          className="border-2 h-10 px-4 m-2 rounded-lg "
        />
      </div>
      <button
        className="border bg-red-800 text-slate-200 italic rounded-md px-4 py-1 mb-4 hover:bg-red-600 hover:text-white hover:scale-105"
        onClick={changePassword}
      >
        change password
      </button>
    </div>
  );
};

export default UserProfile;
