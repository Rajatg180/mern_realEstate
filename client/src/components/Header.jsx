import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();

    // this is js method used to set the urlParmas
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    // getting the urlParms by js method
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  return (
    <header className="bg-slate-200 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap s">
          <Link to="/">
            <span className="text-slate-500 text-3xl">Estate</span>
            <span className="text-slate-700 text-3xl">Ease</span>
          </Link>
        </h1>
        <form
          onClick={handleSubmit}
          className="bg-slate-100 p-3 px-5 rounded-3xl flex items-center shadow-lg"
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search....."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          {/* in this we will hide the items on mobile screen and only show on large screen */}
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline text-xl hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700  text-xl hover:underline hover:cursor-pointer">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover shadow-2xl"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline text-xl"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
