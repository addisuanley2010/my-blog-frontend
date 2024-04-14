import React, { useState ,useEffect} from "react";

import { Link } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import { BASE_URL } from "../utl/config";
const Author = () => {
  const [authors, setauthors] = useState([]);
const [loading, setloading] = useState(false)


useEffect(() => {
  

const fetchPosts=async()=>{
  setloading(true)
  try {
    const response=await axios.get(`${BASE_URL}/users`)
    setauthors(response?.data.authors)
    console.log(response?.data.authors)
  } catch (error) {
    console.log(error.message)
  }
  setloading(false)
}

fetchPosts()

}, [])



if(loading){
  return <Loader/>
}


  return (
    <div className=" max-md:mt-12 mt-16 pt-2  px-3">
      {authors.length > 0 ? (
        <div className=" flex-col grid md:grid-cols-2 gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
          {authors.map((author) => {
            return (
              <Link to={`/posts/users/${author._id}`}>
                <div className="flex border-2 p-2 m-1 rounded-md w-full gap-x-4 italic hover:bg-gray-800 hover:text-white cursor-pointer">
                  <img
                    src={author.imagePath}
                    alt="Img"
                    className="w-12 h-12 rounded-full border-2"
                  />
                  <span>
                    <p>{author.name}</p>
                    <p>{author.posts} posts</p>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-8 md:p-12 justify-center flex ">
          No authors Found!
        </div>
      )}{" "}
    </div>
  );
};

export default Author;
