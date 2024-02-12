import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "src/interface";

const MovieDetails = () => {
  const { id } = useParams(); // Extract the movie ID from URL parameters
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=d01c06772075d10d7c4dd5c7d2db6cfd`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        // Handle error appropriately
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div
          className="h-screen w-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Movie Content */}
        <div className="absolute top-0 left-0 p-10 flex items-center h-full">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-xl"
          />

          {/* Movie Details */}
          <div className="ml-10">
            <h1 className="text-5xl font-bold">{movie.title}</h1>
            <div className="flex items-center my-4">
              <span className="mr-2 text-lg">Rating:</span>
              <span className="text-lg">{movie.vote_average}</span>
            </div>
            <p className="max-w-2xl">{movie.overview}</p>
            <button className="mt-4 px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition duration-300">
              Watch Now
            </button>
            <p className="mt-2">Available on Blu-ray</p>
          </div>
        </div>
      </div>

      {/* Additional movie details such as producers, cast, etc., would go here */}
    </div>
  );
};

export default MovieDetails;
