import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate=useNavigate()
  const goBack=()=>{
    navigate('/')
  }
  return (
    <div className="flex flex-col justify-center h-40 gap-8 items-center">
      <button onClick={goBack} className="bg-gray-500 border-2 py-2 px-4 rounded-md ">
        Back to Home
      </button>
      <h4 className="text-3xl">Error page </h4>
    </div>
  );
};

export default ErrorPage;
