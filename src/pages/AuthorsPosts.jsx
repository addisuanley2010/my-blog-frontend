import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utl/config";
import PostView from "../utl/PostView";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
const AuthorsPosts = () => {
  const [post, setpost] = useState([]);
  const [loading, setloading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setloading(true);
    const getPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/users/${id}`);

        setpost(response?.data.authorPosts);
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
    <div className="   max-md:mt-12 mt-16 pt-2  px-3 ">
      {post?.length > 0 ? (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 gap-x-0">
          {post.map(
            ({ _id, category, title, description, creator, imagePath }) => (
              <PostView
                postId={_id}
                authorId={creator}
                category={category}
                title={title}
                description={description}
                imagePath={imagePath}
              />
            )
          )}
        </div>
      ) : (
        <div className="py-8 md:p-12 justify-center flex ">No Posts Found!</div>
      )}
    </div>
  );
};

export default AuthorsPosts;
