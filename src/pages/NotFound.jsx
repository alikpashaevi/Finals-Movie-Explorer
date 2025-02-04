import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-400 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  )
}

