import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { IoMdClose } from "react-icons/io"; 
import { MdMovie } from "react-icons/md";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowSearch(false); 
    }
  };

  return (
    <header className="bg-gray-800 text-gray-100 p-4">
      <div className="container mx-auto flex items-center justify-between">

        {showSearch ? (
          <form onSubmit={handleSearch} className="relative flex w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-4 py-2 pr-10 rounded text-gray-100 bg-gray-900"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-10 inset-y-0 flex items-center pr-3 text-gray-100 hover:text-blue-400 cursor-pointer"
            >
              <FaSearch />
            </button>
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="absolute right-0 inset-y-0 flex items-center pr-3 text-gray-100 hover:text-red-400 cursor-pointer"
            >
              <IoMdClose size={20} />
            </button>
          </form>
        ) : (
          <>
            <Link
              to="/"
              className="text-2xl font-bold mx-auto md:mx-0 md:mr-auto flex items-center gap-1"
            >
              <span className="text-4xl text-blue-500"><MdMovie /></span> Movie Explorer
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSearch(true)}
                className="text-lg hover:text-blue-400 md:hidden"
              >
                <FaSearch />
              </button>
              <Link
                to="/favorites"
                className="text-lg hover:text-blue-400"
              >
                <FaRegBookmark />
              </Link>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden md:flex relative w-full max-w-md mx-4"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
                className="w-full px-4 py-2 pr-10 rounded text-gray-100 bg-gray-900"
              />
              <button
                type="submit"
                className="absolute right-0 inset-y-0 flex items-center pr-3 text-gray-100 hover:text-blue-400 cursor-pointer"
              >
                <FaSearch />
              </button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
