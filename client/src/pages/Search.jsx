import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">Search term:</label>

            <input type="text" name="searchTerm" id="searchTerm" className="p-3 rounded-lg w-full border" placeholder="Search..." />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className=" font-semibold">Type:</label>
            <div className="flex gap-2 ">
              <input type="checkbox" name="all" id="all" className="w-5" />
              <span> Rent & Sale </span>
            </div>

            <div className="flex gap-2 ">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className=" font-semibold">Amenities:</label>

            <div className="flex gap-2 ">
              <input type="checkbox" name="parking" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="furnished" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className=" font-semibold">Sort: </label>
            <select name="sort_order" id="sort_order" className="rounded-lg p-3 border">
              <option>Price hight to low</option>
              <option>Price low to hight</option>
              <option>Lastest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95">Search</button>
        </form>
      </div>
      <div className="">
        <h1 className=" text-3xl text-center text-slate-700 border p-3 font-semibold mt-5">Listing result:</h1>
      </div>
    </div>
  );
}
