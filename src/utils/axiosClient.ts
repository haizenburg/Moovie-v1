import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // Default parameters
    api_key: "d01c06772075d10d7c4dd5c7d2db6cfd"
  }
});

export default axiosClient;
