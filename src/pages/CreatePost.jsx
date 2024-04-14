import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utl/config";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const CreatePost = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setloading] = useState(false)

  const CATEGORY_OPTIONS = [
    "uncategorized",
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Weather",
  ];

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
        setloading(true)

    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
        navigate("/");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
      }

    } catch (error) {
      console.log(error);
    }
              setloading(false)

  };

 if (loading) {
    return <Loader />;
  }

  return (
    <form className="max-md:mt-12 mt-16 pt-2 px-3 flex flex-col items-center">
      <span className="text-2xl text-gray-800 py-2">Create Post</span>
      <div className="flex flex-col px-4">
        <p className="text-red-500 italic text-xs hidden">
          Error displayed here
        </p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 h-8 my-2"
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 my-2 h-8 px-6 text-slate-950"
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          id="description"
          cols="60"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 w-full px-8"
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
        />
        <button
          onClick={handleSubmit}
          className="border m-2 px-2 py-1 rounded-md bg-slate-600 text-white hover:bg-gray-900"
        >
          Submit Post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
