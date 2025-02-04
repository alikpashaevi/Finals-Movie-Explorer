import { useState, useEffect } from "react"
import MovieList from "../components/MovieList"

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(storedFavorites)
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      {favorites.length > 0 ? <MovieList movies={favorites} /> : <p>You haven't added any favorites yet.</p>}
    </div>
  )
}

