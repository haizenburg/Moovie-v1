import axios from "axios";
import axiosClient from "../../utils/axiosClient";

// const searchTerms = [
//   "action",
//   "comedy",
//   "drama",
//   "thriller",
//   "sci-fi",
//   "documentary",
//   "romance",
//   "horror"
// ];

// export const fetchRandomMovies = async () => {
//   const randomTerm =
//     searchTerms[Math.floor(Math.random() * searchTerms.length)];
//   const response = await axiosClient.get("https://www.omdbapi.com", {
//     params: {
//       apiKey: "aaaa",
//       s: randomTerm
//     }
//   });
//   return response.data.Search;
// };

export const fetchPopularMovies = async () => {
  try {
    const apiKey = "d01c06772075d10d7c4dd5c7d2db6cfd"; // Replace with your actual API key
    const response = await axiosClient.get("/movie/popular", {
      params: {
        api_key: apiKey
      }
    });
    return response.data.results; // TMDb API returns the list of movies in the 'results' field
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error; // Rethrow or handle error as needed
  }
};

// Assuming this function is added to your hooks/home/movies or a similar file
export const fetchMovieGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=d01c06772075d10d7c4dd5c7d2db6cfd`
    );
    return response.data.genres; // This returns an array of genres
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};
