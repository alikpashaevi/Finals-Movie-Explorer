import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 w-auto h-96">
        <div className="h-64 overflow-hidden">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
          <p className="text-gray-400">{movie.Year}</p>
          <p className="text-yellow-500">⭐ {movie.imdbRating}</p>
        </div>
      </div>
    </Link>
  )
}