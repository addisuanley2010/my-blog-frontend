import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utl/config";
import axios from "axios";
import PostAuthor from "../utl/PostAuthor";
import Loader from "./Loader";
import DeletePost from "../utl/DeletePost";
const PostDetail = () => {
  const { id } = useParams();
  const [post, setpost] = useState({});
  const [loading, setloading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id;
  const token = currentUser?.token;

  useEffect(() => {
    setloading(true);
    const getPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${id}`);
        setpost(response?.data.post);
      } catch (error) {
        console.log(error.message);
      }
      setloading(false);
    };
    getPost();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" max-md:mt-12 mt-16 pt-2  px-3 ">
      <div className="flex justify-between items-center  lg:px-40 md:px-16">
        <Link to={`/posts/users/${post.creator}`}>
          <PostAuthor authorId={post.creator} createdAt={post.updatedAt} />
        </Link>
        {token
          ? post.creator == userId && (
              <div className=" gap-x-2 flex p-2 max-sm:px-1 max-sm:gap-x-1 max-sm:text-xs">
                <Link to={"edit"}>
                  <button className="bg-sky-500 px-3 rounded-lg py-1 hover:bg-sky-700 hover:text-white ">
                    edit
                  </button>
                </Link>
                <Link to={"delete"}>
                  <DeletePost postId={post._id} token={token} />
                </Link>
              </div>
            )
          : ""}
      </div>
      <div className="flex justify-center lg:px-40 md:px-16 pb-4 relative">
        <img
          src={post.imagePath}
          className=" w-full lg:w-96 rounded-lg lg:h-96 z-12"
          alt=""
        />
        <button className="font-semibold bg-gray-100 px-2 py-1 hover:bg-gray-950 hover:text-white  italic border-2 rounded-lg text-xs md:text-lg transition-colors duration-500 absolute bottom-2 right-2">
          {post.category}
        </button>
      </div>

      <div className="flex justify-center lg:px-48 xl:px:60 md:px-16 flex-col ">
        <span className="border-b-4 pt-0 mb-2 font-medium italic">
          {post.title}
        </span>
        <p className="italic">{post.description}</p>
      </div>
    </div>
  );
};

export default PostDetail;
