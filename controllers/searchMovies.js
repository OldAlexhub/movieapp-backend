import axios from "axios";

const getMovies = async (req, res) => {
  try {
    const { t } = req.query; // Use req.query instead of req.params
    const apiKey = process.env.API_KEY;

    if (!t) {
      return res.status(400).json({ message: `At least t is required!` });
    }

    const response = await axios.get(
      `http://www.omdbapi.com/?t=${t}&apikey=${apiKey}`
    );

    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getMovies;
