import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utl/config";
import { toast } from "react-toastify";
import Loader from "./Loader";

const UploadImage = ({ token, imagePath }) => {
  const [loading, setloading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    setloading(true)
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await axios.put(`${BASE_URL}/users/edit-profile-image`, formData, {
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
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 1000,
          width: "800px",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
    setloading(false)
  };
 if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-0 pt-0">
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center">
        <div className="relative">
          <img
            src={previewUrl ? previewUrl : imagePath}
            alt="Image"
            className="mb-4 rounded-full w-40 h-40 border-2"
          />
        </div>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          
          Upload
        </button>
        
      </form>
    </div>
  );
};

export default UploadImage;
