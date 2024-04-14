import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
const PostView = ({
  postId,
  authorId,
  category,
  title,
  description,
  updatedAt,
  imagePath
}) => {
  return (
    <div className="flex flex-col bg-white md:m-2 rounded-xl p-2 ">
      <img
        src={imagePath}
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
    </div>
  );
};

export default PostView;
