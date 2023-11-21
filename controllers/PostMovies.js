import MovieModel from "../models/Movies.js";

const postMovies = async (req, res) => {
  try {
    const {
      Title,
      Year,
      Rate,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      imdbRating,
      Type,
      BoxOffice,
      userId,
    } = req.body;

    const newMovie = await MovieModel({
      Title,
      Year,
      Rate,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      imdbRating,
      Type,
      BoxOffice,
      userId: userId,
    });
    await newMovie.save();
    res.status(201).json({ message: `Movie Added Successfully!`, newMovie });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
};
export default postMovies;
