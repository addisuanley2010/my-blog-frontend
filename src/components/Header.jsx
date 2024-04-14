import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import MobileNav from "./MobileNav";
import { UserContext } from "../context/UserContext";
import UserName from "../utl/UserName";
import logo2 from './logo2.png'
const Header = () => {
  const [mobile, setmobile] = useState(false);
  const { currentUser } = useContext(UserContext);

    const token  = currentUser?.token;

  const handleNav = () => {
    setmobile((prevState) => !prevState);
  };
  return (
    <nav>
      {mobile && <MobileNav setmobile={setmobile} />}

      <div className="flex justify-between px-4 pt-1 pb-1  my-0 items-center fixed top-0 right-0 left-0  bg-gray-100 z-50">
        <Link to={"/"} className="">
          <img
            src={logo2}
            alt="logo"
            className="w-32 h-10 md:w-60 md:h-16 rounded-lg "
          />
        </Link>
        {mobile ? (
          <AiOutlineClose
            onClick={handleNav}
            className="sm:hidden text-3xl cursor-pointer"
          />
        ) : (
          <FaBars
            className="sm:hidden text-3xl cursor-pointer"
            onClick={handleNav}
          />
        )}
        {currentUser?.id && (
          <ul className="flex space-x-8  text-lg text-gray-950 font-serif  max-sm:hidden items-center">
              <UserName authorId={currentUser?.id} token={token}/>
            <li>
              <Link to={"/create"}>Create Post</Link>
            </li>
            <li>
              <Link to={"/authors"}>Authors</Link>
            </li>
            <li>
              <Link to={"/logout"}>logout</Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && (
          <ul className="flex space-x-8  text-lg text-gray-950 font-serif  max-sm:hidden">
            <li>
              <Link to={"/authors"}>Authors</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
