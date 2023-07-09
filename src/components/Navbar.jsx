import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

const Navbar = ({
  moviesAPI,
  setMoviesAPI,
  seriesAPI,
  setSeriesAPI,
  toggleBtn2,
  setToggleBtn2,
  setLoading,
}) => {
  const [toggleBtn, setToggleBtn] = useState(false);
  if (toggleBtn2 === false) {
    console.log(seriesAPI);
  } else {
    console.log(moviesAPI);
  }
  return (
    <div className="max-w-[1920px] mx-auto flex justify-between items-center p-4">
      <div className="flex items-center">
        <div className="cursor-pointer">
          <AiOutlineMenu size={30} onClick={(e) => setToggleBtn(!toggleBtn)} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 mr-2">
          Cine<span className="font-bold">movie</span>
        </h1>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-[3px] text-[14px]">
          <p
            onClick={(e) =>
              setToggleBtn2(true) && setLoading(true) && setMoviesAPI(moviesAPI)
            }
            className={
              toggleBtn2
                ? "bg-black text-white rounded-full p-2"
                : "bg-transparent text-black rounded-full p-2"
            }
          >
            Movie
          </p>
          <p
            onClick={(e) =>
              setToggleBtn2(false) &&
              setLoading(true) &&
              setSeriesAPI(seriesAPI)
            }
            className={
              toggleBtn2 === false
                ? "bg-black text-white rounded-full p-2"
                : "bg-transparent text-black rounded-full p-2"
            }
          >
            Series
          </p>
        </div>
      </div>

      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={20} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search movies / series..."
        />
      </div>

      {toggleBtn ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 "></div>
      ) : null}

      <div
        className={
          toggleBtn
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
          onClick={(e) => setToggleBtn(!toggleBtn)}
        />
        <h2 className="text-2xl p-4">
          Cine<span className="font-bold">movie</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <Link to={"/"}>
              <li className="text-xl py-4"> Home</li>
            </Link>
            <Link to={"/showing"}>
              <li className="text-xl py-4"> Showing</li>
            </Link>
            <Link to={"/popular"}>
              <li className="text-xl py-4"> Popular</li>
            </Link>
            <Link to={"/toprated"}>
              <li className="text-xl py-4">Top Rated</li>
            </Link>
            <Link to={"/upcoming"}>
              <li className="text-xl py-4"> Upcoming</li>
            </Link>
            <Link to={"/trending"}>
              <li className="text-xl py-4"> Trending</li>
            </Link>

            <div className="flex lg:hidden items-center bg-gray-200 rounded-full p-[3px] text-[14px] w-[118px] mt-5">
              <p
                onClick={(e) => setToggleBtn2(true) && setMoviesAPI(moviesAPI)}
                className={
                  toggleBtn2
                    ? "bg-black text-white rounded-full p-2"
                    : "bg-transparent text-black rounded-full p-2"
                }
              >
                Movie
              </p>
              <p
                onClick={(e) => setToggleBtn2(false) && setSeriesAPI(seriesAPI)}
                className={
                  toggleBtn2 === false
                    ? "bg-black text-white rounded-full p-2"
                    : "bg-transparent text-black rounded-full p-2"
                }
              >
                Series
              </p>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
