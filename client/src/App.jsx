import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import ToastProvider from "./provider/ToastProvider";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";

export default function App() {
  return (
    <Router>
      <Header />
      <ToastProvider />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/create-listing" element={<CreateListing />} />
          <Route exact path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
