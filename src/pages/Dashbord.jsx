import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../utl/config";
import Loader from "./Loader";
import DeletePost from "../utl/DeletePost";
const Dashbord = () => {
  const [posts, setposts] = useState({});
  const [loading, setloading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const token = currentUser?.token;
  const id = currentUser?.id;

  useEffect(() => {
    setloading(true);
    const myPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/users/${id}`);
        setposts(response?.data.authorPosts);
        console.log(response?.data);
      } catch (error) {
        console.log(error.message);
      }
      setloading(false);
    };
    myPost();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }
  console.log(posts);
  return (
    <div className=" max-md:mt-12 mt-16 pt-2  px-3 ">
      {posts?.length > 0 ? (
        <div className="flex flex-col gap-y-1 border lg:px-28">
          {posts.map((post) => {
            return (
              <div className="flex justify-between max-sm:px-0 max-sm:text-xs px-4 border rounded-md">
                <div className="flex gap-x-2 md:gap-4 items-center max-sm:flex-col max-sm:items-start">
                  <img
                    src={post.imagePath}
                    alt="no image here"
                    className="max-sm:h-6 h-12 rounded-md"
                  />
                  <p className="text-bold">
                    {post.title.length > 15
                      ? post.title.substr(0, 22) + "..."
                      : post.title}
                  </p>
                </div>
                <div className="flex max-sm:gap-x-1 gap-x-2 items-center">
                  <Link to={`/post/${post._id}`}>
                    <button className="  rounded-lg hover:bg-green-700 hover:text-white px-1 py-1  border h-fit bg-green-400">
                      view
                    </button>
                  </Link>
                  <Link to={`/post/${post._id}/edit`}>
                    <button className="  rounded-lg hover:bg-sky-700 hover:text-white px-1 py-1  border h-fit bg-sky-400">
                      edit
                    </button>
                  </Link>
                  <Link to={`/post/${post._id}/delete`}>
                    <DeletePost postId={post._id} token={token} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 md:p-12 justify-center flex ">No Posts Found!</div>
      )}
    </div>
  );
};

export default Dashbord;
