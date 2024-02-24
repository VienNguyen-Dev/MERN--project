import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    offer: false,
    furnished: false,
    sort: "create_at",
    order: "desc",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  console.log(listings);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || orderFromUrl || sortFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        order: orderFromUrl || "desc",
        sort: sortFromUrl || "create_at",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });
    }

    if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
      setSidebardata({
        ...sidebardata,
        type: e.target.id,
      });
    }

    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "create_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">Search term:</label>

            <input type="text" name="searchTerm" id="searchTerm" className="p-3 rounded-lg w-full border" placeholder="Search..." value={sidebardata.searchTerm} onChange={handleChange} />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className=" font-semibold">Type:</label>
            <div className="flex gap-2 ">
              <input type="checkbox" name="all" id="all" className="w-5" checked={sidebardata.type === "all"} onChange={handleChange} />
              <span> Rent & Sale </span>
            </div>

            <div className="flex gap-2 ">
              <input type="checkbox" name="rent" id="rent" className="w-5" checked={sidebardata.type === "rent"} onChange={handleChange} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="sale" id="sale" className="w-5" checked={sidebardata.type === "sale"} onChange={handleChange} />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="offer" id="offer" className="w-5" checked={sidebardata.offer} onChange={handleChange} />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className=" font-semibold">Amenities:</label>

            <div className="flex gap-2">
              <input type="checkbox" name="parking" id="parking" className="w-5" checked={sidebardata.parking} onChange={handleChange} />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="furnished" id="furnished" className="w-5" checked={sidebardata.furnished} onChange={handleChange} />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className=" font-semibold">Sort: </label>
            <select name="sort_order" id="sort_order" className="rounded-lg p-3 border" onChange={handleChange} defaultValue={"create_at_desc"}>
              <option value={"regularPrice_desc"}>Price hight to low</option>
              <option value={"regularPrice_asc"}>Price low to hight</option>
              <option value={"createAt_desc"}>Lastest</option>
              <option value={"createAt-asc"}>Oldest</option>
            </select>
          </div>
          <button className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95">Search</button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className=" text-3xl text-center text-slate-700 border p-3 font-semibold mt-5">Listing result:</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && <p className="text-xl text-slate-700">No listitings found!</p>}
          {loading && <p className="text-slate-700 text-center text-xl w-full">Loading...</p>}
          {!loading && listings && listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
        </div>
      </div>
    </div>
  );
}
