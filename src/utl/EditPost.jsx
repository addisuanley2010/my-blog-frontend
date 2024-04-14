import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "./config";
import axios from "axios";
import Loader from "../pages/Loader";
import { toast } from "react-toastify";
const EditPost = () => {
  const [category, setcatagory] = useState("");
  const [loading, setloading] = useState(false);
  const [title, settitle] = useState("");
  const [descrption, setdescrption] = useState("");
  const [thumbinal, setthumbinal] = useState(null);
  const CATAGORY = [
    "uncatagorized",
    "Agriculture",
    "Bussiness",
    "Education",
    "entertaiment",
    "Art",
    "Investment",
    "Weather",
  ];
  const { currentUser } = useContext(UserContext);

  const token = currentUser?.token;

  const id = currentUser?.id;

  const navigate = useNavigate();
  const postId = useParams();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
        console.log(token,'hhhhhhhhhhhhhhhh')

      setloading(true);
      const myPost = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/posts/${postId.id}`);
          settitle(response?.data.post.title);
          setcatagory(response?.data.post.category);
          setdescrption(response?.data.post.description);
        } catch (error) {
          console.log(error.message);
        }
        setloading(false);
      };
      myPost();
    }
  }, []);

 
  const handleSubmit = async () => {
    try {
      const userData = await axios.put(
        `${BASE_URL}/posts/${postId.id}`,
        { title, description:descrption, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (userData.data.success) {
        toast.success(userData.data.success, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
        navigate("/");
      } else {
        toast.error(userData.data.message, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" max-md:mt-12 mt-16 pt-2  px-3 flex flex-col items-center">
      <span className="text-2xl text-gray-800 py-2 ">Edit Post</span>
      <div className="flex flex-col px-4">
        <p className="text-red-500 italic text-xs hidden">
          Error displayed here
        </p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="border px-4 h-8 my-2"
        />
        <select
          name="category"
          id=""
          value={category}
          onChange={(e) => {
            setcatagory(e.target.value);
          }}
          className="border-2 my-2 h-8 px-6  text-slate-950"
        >
          {CATAGORY.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
        <textarea
          name="description"
          id="description"
          cols="60"
          rows="10"
          value={descrption}
          onChange={(e) => {
            setdescrption(e.target.value);
          }}
          className="border-2 w-full px-8"
        />
        <input
          type="file"
          name="thuminal"
          value={thumbinal}
          onChange={(e) => {
            setthumbinal(e.target.files[0]);
          }}
          accept="jpg ,png, jpeg"
        />
        <button
          onClick={handleSubmit}
          className="border m-2 px-2 py-1 rounded-md bg-slate-600 text-white hover:bg-gray-900"
        >
          update Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
