import "./Navbar.css";
import logo from "../image/favicon.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const logoutFunc = async () => {
    toast.success("Çıkış işlemi gerçekleştiriliyor...");
    await signOut(auth);
    setTimeout(() => {
      // window.location = "/";
      navigate("/");
    }, 5000);
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div onClick={logoutFunc}>logout</div>
    </div>
  );
};

export default Navbar;
