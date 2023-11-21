import MovieModel from "../models/Movies.js";

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(201)
      .json({ message: "Movie Deleted Successfully", deletedMovie });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default deleteMovie;
