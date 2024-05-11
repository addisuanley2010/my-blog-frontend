import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import bg2 from "./bg2.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "./config";
import { UserContext } from "../context/UserContext";
import {
  AiFillHeart,
  AiFillLike,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineLike,
} from "react-icons/ai";

const PostView = ({
  postId,
  authorId,
  category,
  title,
  description,
  updatedAt,
  imagePath,
  likesCount,
  likes,
  setrefresh,
  refresh,
}) => {
  const { currentUser } = useContext(UserContext);

  const token = currentUser?.token;

  const hanldeLike = async (postId) => {
    try {
      const likeData = await axios.post(
        `${BASE_URL}/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setrefresh(!refresh);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkLike = (likes, targetId) => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i] === targetId) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col bg-white md:m-2 rounded-xl p-2 ">
      <img
        src={imagePath}
        // src={bg2}
        alt={"no content"}
        className=" w-full rounded-xl hover:scale-105 duration-500 max-h-48 max-w-68"
      />
      <Link to={`/post/${postId}`} className="p-3 bg-gray-50 border-b-2 w-full">
        <span className="italic font-semibold  p-2">
          {title.length > 20 ? title.substr(0, 20) + "..." : title}
        </span>
      </Link>

      <span>
        {description.length > 200
          ? description.substr(0, 200) + "..."
          : description}
        <Link to={`/post/${postId}`} className="font-bold cursor-pointer px-4">
          more
        </Link>
      </span>
      <div className="flex justify-between px-1 items-center">
        <Link to={`/posts/users/${authorId}`}>
          <PostAuthor authorId={authorId} createdAt={updatedAt} />
        </Link>
        <Link to={`/posts/catagories/${category}`}>
          <button className="font-semibold bg-gray-100 px-2 py-1 hover:bg-gray-950 hover:text-white  italic border-2 rounded-lg text-xs md:text-lg transition-colors duration-500">
            {category}
          </button>
        </Link>
      </div>
      <div className="relative flex items-center">
        <button
          className={`focus:outline-none ${
            checkLike(likes, currentUser.id) ? "text-red-600" : "text-gray-500"
          }`}
          onClick={() => hanldeLike(postId)}
        >
          <div className="relative">
            {checkLike(likes, currentUser.id) ? (
              <AiFillHeart className="text-2xl" />
            ) : (
              <AiOutlineHeart className="text-2xl" />
            )}
            {likesCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                {likesCount}
              </span>
            )}
          </div>
        </button>
        <button className="ml-4">
          <AiOutlineComment className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default PostView;
