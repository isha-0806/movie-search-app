"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Genres from "./Genres";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const search = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsImageLoading(true);
    setMovie(null);

    let searchMovie = search?.get("movie") || "avengers";

    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
          query: searchMovie,
        },
      })
      .then((response) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${response?.data?.results[0]?.id}`,
            {
              params: {
                api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
                append_to_response: "videos",
              },
            }
          )
          .then((res) => {
            setMovie(res.data);
            setIsLoading(false);
            setIsImageLoading(false);
          });
      });
  }, [search]);

  return (
    <div className="bg-secondary relative px-4 md:px-0">
      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
        <div className="flex flex-col lg:flex-row gap-10 lg:mx-10 py-20">
          {isLoading && <Loader />}
          {movie && (
            <>
              <div className="mx-auto flex-none relative">
                {movie?.poster_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt="movie_poster"
                    width={700}
                    height={700}
                    className="w-[300px] object-cover"
                    onLoadingComplete={() => {
                      setIsImageLoading(false);
                    }}
                    priority
                  />
                )}

                {isImageLoading && <Loader />}
              </div>

              <div className="space-y-6">
                <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
                  {movie?.title}
                </div>
                <div className="flex gap-4 flex-wrap">
                  {movie?.genres?.map((genre, index) => {
                    return (
                      <Genres
                        key={genre?.id}
                        index={index}
                        length={movie?.genres?.length}
                        name={genre?.name}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <div>Language: {movie?.original_language?.toUpperCase()}</div>
                  <div>Release: {movie?.release_date}</div>
                  <div>Runtime: {movie?.runtime} min</div>
                  <div>Rating: {Number(movie?.vote_average).toFixed(2)} ⭐</div>
                </div>

                <div className="pt-14 space-y-2 pr-4">
                  <div>Overview:</div>
                  <div className="lg:line-clamp-4">{movie?.overview}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
