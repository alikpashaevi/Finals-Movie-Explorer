import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"

export default function Home() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchTerm = searchParams.get("search") || "Avengers"

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
        if (response.data.Search) {
          setMovies(response.data.Search)
        } else {
          setError("No movies found")
        }
      } catch (err) {
        setError("An error occurred while fetching movies")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [searchTerm])

  if (loading) return <div className="h-dvh w-full flex justify-center items-center"><Loading /></div>
  if (error) return <div className="h-full w-full flex justify-center">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {searchParams.get("search") ? `Search Results for "${searchTerm}"` : "Recommended Movies"}
      </h1>
      <MovieList movies={movies} />
    </div>
  )
}

