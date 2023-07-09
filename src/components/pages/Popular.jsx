import React, { useEffect, useState } from "react";
import Card from "../Card";
import ReactPaginate from "react-paginate";

const Popular = ({ toggleBtn2, API_URL_POPULAR, options }) => {
  const [newPopularMovie, setNewPopularMovie] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await fetch(API_URL_POPULAR, options);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setNewPopularMovie(data);
        setPageCount(Math.ceil(79)); // Math.ceil rounds up
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchPopular();
  }, [toggleBtn2]);

  const getNextPage = async (currentPage) => {
    let API_NEW_POPULAR = toggleBtn2
      ? `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${currentPage}`;
    const response = await fetch(API_NEW_POPULAR, options);
    const data = await response.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const updatePageVar = await getNextPage(currentPage);
    setNewPopularMovie(updatePageVar);
  };

  return (
    <div className="max-w-[1920px] mx-auto p-4">
      <h1 className="text-xl md:text-2xl mb-5">
        <span className="font-bold">Popular </span>{" "}
        {toggleBtn2 ? "Movies" : "Series"}
      </h1>

      <div className="movie-container grid gap-2 md:gap-3 lg:gap-4">
        <Card newPopularMovie={newPopularMovie} />
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
          previousLinkClassName="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300"
          pageLinkClassName="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-950 transition-all duration-300 hover:bg-neutral-100"
          nextLinkClassName="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100"
          breakLinkClassName="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-950 transition-all duration-300 hover:bg-neutral-100"
          activeClassName="bg-white text-white shadow-sm "
        />
      </nav>
    </div>
  );
};

export default Popular;
