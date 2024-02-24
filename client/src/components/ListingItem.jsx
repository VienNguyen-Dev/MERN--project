import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || "https://img.indiafilings.com/learn/wp-content/uploads/2015/10/12011006/Real-Estate-Agent-Business-India.jpg"}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col w-full gap-2">
          <p className="text-lg text-slate-700 font-semibold text truncate">{listing.name}</p>
          <div className=" flex gap-1 items-center">
            <MdLocationOn className="w-4 h-4 text-green-900" />
            <p className=" text-gray-600 truncate text-sm w-full">{listing.address}</p>
          </div>
          <p className="text-sm  text-gray-600 line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 font-semibold mt-2">
            ${listing.offer ? `${listing.discountPrice.toLocaleString("en-Us")}` : `${listing.regularPrice.toLocaleString("en-Us")}`}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center gap-4 text-slate-700">
            <div className="text-xs font-bold">{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</div>
            <div className="text-xs font-bold">{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
