import React, { useEffect } from "react";
import { useState } from "react";

const Cast = ({ toggleBtn2, LazyLoadImage, useParams }) => {
  const [actorInfo, setActorInfo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchActorInfo = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTIyZGQ1NjIwN2QzZmU5ODMyNTI1NDEwZWQ3NDZmMiIsInN1YiI6IjYxMDkxMWExMmY4ZDA5MDA0OGU5ZWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EL9RLiEv0kAhIhDOY0UnQkka_X4fTF5Lqa10DPFJBNg",
          },
        };
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}`,
          options
        );
        if (!response.ok)
          throw new Error("Network response for Actor Infor was not ok");
        const data = await response.json();
        setActorInfo(data);
      } catch (e) {
        console.log("Error", e);
      }
    };

    fetchActorInfo();
  }, []);
  console.log(actorInfo);
  return <div>Cast</div>;
};

export default Cast;
