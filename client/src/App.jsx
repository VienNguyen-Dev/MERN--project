import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import ToastProvider from "./provider/ToastProvider";
import PrivateRoute from "./components/PrivateRoute";

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
        </Route>
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
