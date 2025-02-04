import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="bg-gray-800 text-gray-100 p-4">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
          Movie App
        </Link>
        <form onSubmit={handleSearch} className="flex w-full max-w-md mb-4 md:mb-0 md:mx-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded-l text-gray-900"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r">
            Search
          </button>
        </form>
        <nav>
          <Link to="/favorites" className="hover:text-blue-400">
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  )
}

