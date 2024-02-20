import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signInFalure,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setupdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(filePerc);
  console.log(file);
  console.log(formData.avatar);
  console.log(fileUploadError);
  console.log(currentUser);

  //firease storage
  // allow read, write: if
  //     request.resource.size < 2* 1024 * 1024&&
  //     request.resource.contentType.matches("image/.*")

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error("Something went wrong");
        setupdateSuccess(false);
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success("Update successfuly!");
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Something went wrong");
      setupdateSuccess(false);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("User is deleted!");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error("Something went wrong");
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = res.json();

      if (data.success === false) {
        dispatch(signInFalure(data.message));
        navigate("/sign-in");
        return;
      }

      dispatch(signOutUserSuccess(data));
      toast.success("Logged user success!");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="font-semiold text-3xl my-7 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className="rounded-full w-24 h-24 object-cover self-center cursor-pointer" />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error image upload (Image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfuly uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input type="text" placeholder="Username" className="rounded-xl p-3" id="username" defaultValue={currentUser.username} onChange={handleChange} />
        <input type="email" placeholder="Email" className="rounded-xl p-3" id="email" defaultValue={currentUser.email} onChange={handleChange} />
        <input type="password" placeholder="Password" className="rounded-xl p-3" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-xl hover:opacity-95 text-white disabled:opacity-80">
          {loading ? "Loading" : "Update"}
        </button>
        <Link className="bg-green-700 p-3 rounded-xl text-white text-center hover:opacity-95 uppercase" to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <div>
        <p className="text-red-700 mt-5"> {error ? error : ""}</p>
        <p className="text-green-700">{updateSuccess ? "User is updated successefully" : ""}</p>
      </div>
    </div>
  );
}
