import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import "./Auth.css";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const Auth = () => {
  const navigate = useNavigate();
  const [singUp, setSingUp] = useState(true);
  const [autData, setAutData] = useState({ email: "", password: "" });
  const onChangeFunc = (e) => {
    setAutData({ ...autData, [e.target.name]: e.target.value });
  };
  //singUp kısmı yeni üye olusturmak için https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0
  // else kısmı mevcut üye giriş kısmı.
  const authFunc = async () => {
    if (singUp) {
      try {
        const data = await createUserWithEmailAndPassword(
          auth,
          autData.email,
          autData.password
        );
        const user = data.user;
        if (user) {
          window.location = "/dashboard"; //Window.location nesnesi, geçerli sayfa adresini (URL) almak ve tarayıcıyı yeni bir sayfaya yönlendirmek için kullanılabilir.
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const data = await signInWithEmailAndPassword(
          auth,
          autData.email,
          autData.password
        );
        const user = data.user;
        if (user) {
          // window.location = "/dashboard"; //Window.location nesnesi, geçerli sayfa adresini (URL) almak ve tarayıcıyı yeni bir sayfaya yönlendirmek için kullanılabilir.
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const token = credential.accessToken;
      const user = data.user;
      if (user) {
        // window.location = "/dashboard";
        navigate("/dashboard");
      }
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(credential);
    }
  };
  return (
    <div className="auth">
      <div className="aut-container">
        <h2>{singUp ? "REGISTER" : "Login"}</h2>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Enter E-mail..."
          value={autData.email}
          onChange={onChangeFunc}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Enter Password..."
          value={autData.password}
          onChange={onChangeFunc}
        />
        <button onClick={googleLogin}>
          <FcGoogle style={{ fontSize: "1.5rem" }} />
          Google ile Giriş
        </button>
        <p onClick={() => setSingUp(!singUp)}>
          {singUp
            ? "Giriş yapmak için tıklayınız?"
            : "Kayıt olmak için tıklayınız?"}
        </p>
        <button onClick={authFunc}>{singUp ? "REGISTER" : "Login"}</button>
      </div>
    </div>
  );
};

export default Auth;
