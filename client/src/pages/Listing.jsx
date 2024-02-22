import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params]);
  console.log(listing);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
      {listing && !loading && !error && (
        <div className="">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="h-[550px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize: "cover" }}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] z-10 right-[3%] w-12 h-12 rounded-full border bg-slate-100 items-center justify-center flex cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href); //ghi địa chỉ URL của trang hiện tại vào clipboard của người dùng khi được thực thi
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Link copied!</p>}
          <div className="flex flex-col gap-4 my-7 max-w-4xl mx-auto p-3">
            <p className="text-2xl font-semibold">
              {listing.name} - ${""}
              {listing.offer ? listing.discountPrice.toLocaleString("en-Us") : listing.regularPrice.toLocaleString("en-Us")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex gap-2 items-center mt-6 text-sm text-slate-700">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 text-white text-center w-full max-w-[200px] p-1 rounded-md">{listing.type === "rent" ? "For rent" : "For sale"}</p>
              {listing.offer && <p className="bg-green-900 p-1 text-white text-center rounded-md w-full max-w-[200px]">${+listing.regularPrice - +listing.discountPrice}</p>}
            </div>
            <p className="text-slate-800">
              <span className="text-black font-semibold">Description - </span>
              {listing.description}
            </p>
            <ul className=" flex gap-4 items-center sm:gap-6 font-semibold text-sm text-green-900 flex-wrap">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? `Parking spot` : `No parking`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnihed ? `Furnished` : `Unfurnished`}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => {
                  setContact(true);
                }}
                className=" uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
