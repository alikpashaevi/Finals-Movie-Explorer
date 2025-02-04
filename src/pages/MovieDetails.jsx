import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import MovieList from "../components/MovieList"

export default function MovieDetails() {
  const apiKey = import.meta.env.VITE_API_KEY

  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [similarMovies, setSimilarMovies] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
        setMovie(response.data)
        const similarResponse = await axios.get(
          `http://www.omdbapi.com/?s=${response.data.Genre.split(", ")[0]}&type=movie&apikey=${apiKey}`,
        )
        setSimilarMovies(similarResponse.data.Search || [])
      } catch (err) {
        setError("An error occurred while fetching movie details")
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.some((fav) => fav.imdbID === id))
  }, [id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.imdbID !== id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    } else {
      favorites.push(movie)
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!movie) return <div>Movie not found</div>

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <p className="text-xl mb-2">
            {movie.Year} • {movie.Runtime}
          </p>
          <p className="mb-4">{movie.Plot}</p>
          <p className="mb-2">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="mb-2">
            <strong>Cast:</strong> {movie.Actors}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="mb-4">
            <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
          </p>
          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded ${
              isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
      <MovieList movies={similarMovies} />
    </div>
  )
}

