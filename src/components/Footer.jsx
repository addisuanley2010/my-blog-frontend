import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const style =
    "bg-gray-800 px-2 rounded-md hover:text-gray-950 hover:bg-gray-400 max-sm:text-xs py-2 px-4";

  return (
    <div className="flex flex-col justify-center items-center bg-gray-950  text-white h-40 max-lg:h-60">
      <div className="flex items-center h-36 gap-x-4 max-md:flex-col max-lg:h-56 max-lg:grid max-lg:grid-cols-2">
        <ul className={`${style}`}>
          <Link to={"posts/catagories/Agriculture"}> Agriculture</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/Bussiness"}> Bussiness</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/Education"}> Education</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/entertaiment"}> entertaiment</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/Art"}> Art</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/Investment"}> Investment</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/Weather"}> Weather</Link>
        </ul>
        <ul className={`${style}`}>
          <Link to={"posts/catagories/uncatagorized"}> uncatagorized</Link>
        </ul>
      </div>
      <span className="border-b-2 border-slate-900 w-full "></span>
      <div className="h-12 flex items-center text-xs lg:text-md">
        All Rights Rserved @copyrigrht 2023 Addisu Anley{" "}
      </div>
    </div>
  );
};

export default Footer;
