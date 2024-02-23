import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search); //Tao ra biến để lưu các giá trị trả về từ truy vấn kể cả dấu "?"
    urlParams.set("searchTerm", searchTerm); //Dặt giá trị tham số truy vấn 'searchTerm' vào biến searchTerm.Việc set biến searchTerm để giúp chúng ta cập nhật giá trị của  urlParams sau mỗi lần truy vấn

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTremFromUrl = urlParams.get("searchTerm");
    if (searchTremFromUrl) {
      setSearchTerm(searchTremFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input type="text" placeholder="Search..." className=" bg-transparent focus:outline-none w-24 sm:w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" /> : <li className="text-slate-700 hover:underline hidden sm:inline">Sign In</li>}
          </Link>
        </ul>
      </div>
    </header>
  );
}
