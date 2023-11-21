import fetch from "node-fetch"; // Make sure to import fetch if you're using Node.js

const HomePage = async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_URI_TOKEN, // Replace with your actual token
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data structure");
    }

    let movies = data.results;

    // Optionally, apply any additional filtering or sorting
    movies = movies.filter((movie) => movie.vote_average >= 6);
    movies.sort((a, b) => b.vote_average - a.vote_average);

    // Slice the movies array according to pageSize
    const paginatedMovies = movies.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    res.status(200).json({
      message: "Paginated movies",
      page,
      pageSize,
      totalMovies: movies.length,
      movies: paginatedMovies,
    });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export default HomePage;
