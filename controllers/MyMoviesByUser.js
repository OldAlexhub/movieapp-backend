import MovieModel from "../models/Movies.js";

const MyMoviesByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    // console.log(userId);
    const movies = await MovieModel.find({ userId: userId });
    res.status(200).json({ message: `Pernonalized Movies`, movies });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error!` });
  }
};
export default MyMoviesByUser;
