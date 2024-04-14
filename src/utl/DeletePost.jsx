import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";
import axios from "axios";
import { BASE_URL } from "./config";
import { toast } from "react-toastify";

const DeletePost = ({ postId, token }) => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleDelete = async () => {
    setloading(true);
    try {
      const userData = await axios.delete(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userData.data.success) {
        toast.success(userData.data.success, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
        navigate("/mypost");
      } else {
        toast.error(userData.data.message, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
      }
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <button
      className="bg-red-500 px-2 rounded-lg py-1 hover:bg-red-700 hover:text-white"
      onClick={handleDelete}
    >
      delete
    </button>
  );
};

export default DeletePost;
