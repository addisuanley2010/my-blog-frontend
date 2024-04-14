import React from "react";

const Button = ({handleSubmit}) => {
  return (
    <button
      onClick={handleSubmit}
      className="border-2 rounded-lg h-10  mt-4 mb-2 text-white bg-gray-700 hover:bg-gray-950"
    >
      submit
    </button>
  );
};

export default Button;
