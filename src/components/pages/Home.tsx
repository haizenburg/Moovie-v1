import MovieCard from "components/atoms/MovieCard";
import { fetchPopularMovies, fetchMovieGenres } from "hooks/home/movies";
import { useEffect, useState } from "react";
import { Genre, Movie } from "src/interface";

export default function Home() {
  // const [formVisible, setFormVisible] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<{
    [key: string]: Movie[];
  }>({});
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

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
        const response = await fetchPopularMovies(); // Assuming fetchRandomMovies is available
        setMovies(response);
        console.log("Fetched movies:", response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  // // Update your movies by genre to use the filteredMovies
  useEffect(() => {
    const moviesGenreMap: { [key: string]: Movie[] } = {};
    genres.forEach((genre) => {
      // Use a different variable name for the filtered movies inside the loop to avoid naming conflict
      const moviesInGenre = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(genre.id)
      );
      if (moviesInGenre.length > 0) {
        moviesGenreMap[genre.name] = moviesInGenre;
      }
    });
    setMoviesByGenre(moviesGenreMap);
  }, [filteredMovies, genres]);

  // const handleAddTodo = async ({ task, selectedMovie, dueDate }) => {
  //   // Here you would add the logic to insert the new to-do item into the database
  //   // console.log("adding thee movie bro", task, selectedMovie, dueDate);
  //   // Close the form after submission
  //   setFormVisible(false);
  // };

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

      <div className="p-10">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md text-black"
        />
      </div>

      {/* Categories Section */}
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
