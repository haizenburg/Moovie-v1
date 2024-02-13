/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import MovieCard from "components/atoms/MovieCard";
import { fetchPopularMovies, fetchMovieGenres } from "hooks/home/movies";
import { useEffect, useState } from "react";
import { Genre, Movie } from "src/interface";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<{
    [key: string]: Movie[];
  }>({});
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const fetchMoviesWithSearchTerm = async (search: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d01c06772075d10d7c4dd5c7d2db6cfd&query=${search}`
      );
      console.log("Fetched movies with search term:", response.data.results);
      setFilteredMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      try {
        const fetchedMovies = await fetchPopularMovies();
        const fetchedGenres = await fetchMovieGenres();
        setMovies(fetchedMovies);
        setGenres(fetchedGenres);

        // Organize movies by genres
        const moviesGenreMap: { [key: string]: Movie[] } = {};
        fetchedGenres.forEach((genre: Genre) => {
          const filteredMovies = fetchedMovies.filter((movie: Movie) =>
            movie.genre_ids.includes(genre.id)
          );
          if (filteredMovies.length > 0) {
            moviesGenreMap[genre.name] = filteredMovies;
          }
        });
        setMoviesByGenre(moviesGenreMap);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initFetch();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchPopularMovies();
        setMovies(response);
        console.log("Fetched movies:", response, genres);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchMoviesWithSearchTerm(searchTerm);
    } else {
      fetchPopularMovies();
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-[500px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
          <div className="absolute bottom-0 p-10">
            <h1 className="text-5xl font-bold mb-4">{movies[0]?.title}</h1>
            <p className="mb-6">{movies[0]?.overview}</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Play
            </button>
            <button className="text-white ml-4">More Info</button>
          </div>
        </div>
      </div>

      <div className="p-10 flex gap-5">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl text-black"
        />

        <button onClick={handleSearch} className=" bg-primary p-2 rounded-xl">
          Search
        </button>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="space-y-8">
          {Object.entries(moviesByGenre).map(([genreName, moviesInGenre]) => (
            <div key={genreName} className="mb-8">
              <h2 className="text-xl font-bold mb-4 px-10">{genreName}</h2>
              <div className="flex overflow-y-scroll space-x-4 px-10">
                {moviesInGenre.map((movie) => (
                  <div key={movie.id}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10 py-4">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
      {/* Floating Action Button for ToDo list here
      {formVisible && (
        <TodoForm
          isVisible={formVisible}
          onSubmit={handleAddTodo}
          movies={movies}
        />
      )}
      <FloatingActionButton onClick={() => setFormVisible(!formVisible)} /> */}
    </div>
  );
}
