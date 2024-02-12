import React from "react";
import { Movie } from "src/interface";
import { useNavigate } from "react-router-dom";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const router = useNavigate();

  const handleClick = () => {
    router(`/details/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-slate-50 via-slate-200 to-slate-900 cursor-pointer"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path})`
        }}
      ></div>

      {/* Overlay with gradient and content, only visible on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-b from-transparent to-slate-900 transition-opacity duration-300 ease-in-out">
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-sm">{movie.title}</h3>
          <p className="text-xs">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
