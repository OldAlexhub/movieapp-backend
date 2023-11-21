import MovieModel from "../models/Movies.js";

const MyMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json({ message: `Movies`, movies });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default MyMovies;
