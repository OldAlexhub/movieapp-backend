import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  userId: { type: String },
  Title: { type: String },
  Year: { type: Number },
  Rate: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  imdbRating: { type: String },
  Type: { type: String },
  BoxOffice: { type: String },
});
const MovieModel = mongoose.model("movies", MovieSchema);
export default MovieModel;
