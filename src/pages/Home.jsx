import React, { useState, useEffect } from "react";
import axios from "axios";
import PostView from "../utl/PostView";
import Loader from "./Loader";

import { BASE_URL } from "../utl/config";
const Home = () => {
  const [post, setpost] = useState([]);
  const [loading, setloading] = useState(false);
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true);
      try {
        const response = await axios.get(`${BASE_URL}/posts`);
        setpost(response?.data.message);
      } catch (error) {
        console.log(error.message);
      }
      setloading(false);
    };

    fetchPosts();
  }, [refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="   max-md:mt-12 mt-16 pt-2  px-3 ">
      {post.length > 0 ? (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 gap-x-0">
          {post.map(
            ({
              _id,
              category,
              title,
              description,
              creator,
              imagePath,
              updatedAt,
              likesCount,
              likes,
            }) => (
              <PostView
                postId={_id}
                authorId={creator}
                category={category}
                title={title}
                description={description}
                imagePath={imagePath}
                updatedAt={updatedAt}
                likesCount={likesCount}
                likes={likes}
                setrefresh={setrefresh}
                refresh={refresh}
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

export default Home;
