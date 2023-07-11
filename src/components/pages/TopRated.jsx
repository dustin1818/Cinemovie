import React, { useEffect, useState, useRef } from "react";
import Card from "../Card";
import BigLoader from "../BigLoader";
import ReactPaginate from "react-paginate";

const TopRated = ({ toggleBtn2, options }) => {
  const [newMovie, setNewMovie] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const fetchMovie = async (currentPage) => {
      try {
        let API_NEW_TOPRATED = toggleBtn2
          ? `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`
          : `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${currentPage}`;
        const response = await fetch(API_NEW_TOPRATED, options);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setNewMovie(data);
        setPageCount(Math.ceil(data.total_results / 20));
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchMovie();
  }, []);

  const getNextPage = async (currentPage) => {
    let API_NEW_TOPRATED = toggleBtn2
      ? `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${currentPage}`;
    const response = await fetch(API_NEW_TOPRATED, options);
    const data = await response.json();
    return data;
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    const updatePageVar = await getNextPage(currentPage);
    setNewMovie(updatePageVar);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={ref} className="max-w-[1920px] mx-auto p-4 py-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl mb-5 lg:mb-9 text-center">
          <span className="font-bold">Top Rated </span>{" "}
          {toggleBtn2 ? "Movies" : "Series"}
        </h1>

        {newMovie === null && <BigLoader />}
        {newMovie && (
          <>
            <div className="movie-container grid gap-2 md:gap-3 lg:gap-4">
              <Card newMovie={newMovie} />
            </div>

            <nav className="Page navigation example mt-5">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={pageCount} // total number of pages
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="list-style-none flex justify-center"
                previousLinkClassName="pointer-events-none relative block rounded bg-transparent px-1.5 md:px-3 py-1.5 text-xs md:text-sm text-neutral-500"
                pageLinkClassName="relative block rounded bg-transparent px-1.5 md:px-3 py-1.5 text-xs md:text-sm text-neutral-950 hover:bg-neutral-100"
                nextLinkClassName="relative block rounded bg-transparent px-1.5 md:px-3 py-1.5 text-xs md:text-sm text-neutral-600 hover:bg-neutral-100"
                breakLinkClassName="relative block rounded bg-transparent px-1.5 md:px-3 py-1.5 text-xs md:text-sm text-neutral-950 hover:bg-neutral-100"
                activeClassName="relative block rounded !bg-black !text-white !shadow-md"
                activeLinkClassName="relative block rounded !bg-black !text-white"
              />
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default TopRated;
