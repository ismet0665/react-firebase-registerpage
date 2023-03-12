import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setUsers(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="dashboard" element={<Home users={users}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
}

export default App;
