import React, { useEffect, useState } from "react";
import { BASE_URL } from "./config";
import axios from "axios";
import { Link } from "react-router-dom";

const UserName = ({ authorId, token, onClick }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${authorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response?.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserName();
  }, []);

  return (
    <Link to={`/profile/${authorId}`} onClick={onClick} className="max-sm:flex max-sm:flex-col max-sm:items-center  max-sm:w-full  rounded-md pt-1 pb-0 max-sm:hover:bg-gray-700 ">
      <img src={userData?.imagePath} alt="no" className="bg-white rounded-full w-10 h-10 max-sm:w-12 max-sm:h-12" />
      <p className="text-xs italic max-sm:pt-2 max-sm:pb-0">{userData?.name}</p>
    </Link>
  );
};

export default UserName;
