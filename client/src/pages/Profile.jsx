import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="font-semiold text-3xl my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2" src={currentUser.avatar} alt="profile" />
        <input type="text" placeholder="Username" className="rounded-xl p-3" id="username" />
        <input type="email" placeholder="Email" className="rounded-xl p-3" id="email" />
        <input type="password" placeholder="Password" className="rounded-xl p-3" id="password" />
        <button className="bg-slate-700 p-3 rounded-xl hover:opacity-95 text-white disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
}
