import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input className="p-3 border rounded-xl" type="text" name="name" id="name" placeholder="Name" maxLength="62" minLength="10" required />
          <textarea className="p-3 border rounded-xl" type="text" name="description" id="description" placeholder="Description" />
          <input className="p-3 border rounded-xl" type="text" name="address" id="address" placeholder="Address" required />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="number" name="bedrooms" min="1" max="10" required className="p-3 rounded-xl border-gray-300 border" />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" name="bathrooms" min="1" max="10" required className="p-3 rounded-xl border-gray-300 border" />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" name="regularPrice" min="1" max="10" required className="p-3 rounded-xl border-gray-300 border" />
              <div className="flex flex-col items-center">
                <p>Regular price </p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" name="discountPrice" min="1" max="10" required className="p-3 rounded-xl border-gray-300 border" />
              <div className="flex flex-col items-center">
                <p>Discount price </p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">The first image will be cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className="p-3 border-gray-300 border rounded w-full" type="file" name="images" accept="/*image" multiple />
            <button className="p-3 border-green-700 rounded border uppercase text-green-700 hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button
            className="p-3 bg-slate-700 rounded-xl text-white uppercase hover:opacity-95 disabled:
        opacity-80"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
