import { Router } from "express";
import createUser from "../controllers/createUser.js";
import Login from "../controllers/Login.js";
import getMovies from "../controllers/searchMovies.js";
import protectRoute from "../middleware/protectRoutes.js";
import restrictTo from "../middleware/restrictTo.js";
import postMovies from "../controllers/PostMovies.js";
import MyMovies from "../controllers/MyMovies.js";
import deleteMovie from "../controllers/deleteMovie.js";
import MyMoviesByUser from "../controllers/MyMoviesByUser.js";
import HomePage from "../controllers/HomaPage.js";

const router = Router();
const usersOnly = restrictTo("user", "admin");
const adminOnly = restrictTo("admin");

router.post("/signup", createUser);
router.post("/login", Login);
//protected routes
router.get("/getmovies", protectRoute, usersOnly, getMovies);
router.post("/addmovies", protectRoute, usersOnly, postMovies);
router.get("/mymovies", protectRoute, usersOnly, MyMoviesByUser);
router.delete("/deletemovie/:id", protectRoute, usersOnly, deleteMovie);

//abo balash :D
router.get("/freesearch", getMovies);
router.get("/randommovies", HomePage);

//admin
router.get("/allmovies", protectRoute, adminOnly, MyMovies);

export default router;
