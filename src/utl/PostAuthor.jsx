import React, { useEffect, useState } from "react";
import { BASE_URL } from "./config";
import axios from "axios";
import moment from 'moment'
const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setauthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/users/getAuthor/${authorId}`
        );

        setauthor(response?.data.message);
    
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthor();
  }, [authorId]);

const getTimeAgoString=((dateTime)=>{
return moment(dateTime).fromNow()
})


  return (
      <div className="bg-gray-50 px-2 rounded-lg hover:bg-gray-900 hover:text-white flex items-center justify-center gap-1 transition-colors duration-300 ">
        <img
          src={author.imagePath}
          alt="Img"
          className="rounded-full h-8 md:h-12 md:w-12 cursor-pointer border-2"
        />
        <div className="text-xs flex flex-col items-center justify-center ">
          <p className="font-semibold"> {author.name}</p>
          <p>{getTimeAgoString(author.createdAt)}</p>
        </div>
      </div>
  );
};

export default PostAuthor;
