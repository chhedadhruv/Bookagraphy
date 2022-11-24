import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/Login.css";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <div className="main">
        <div className="box bigbox">
          <h1>Sign In</h1>
          <form>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
          <button className="signinbutton" onClick={signin}>
            Sign In
          </button>
          <p className="text">
            Don't have an account?
            <Link to="/signup" className="a">
              {" "}
              Create Account
            </Link>
          </p>
          <button className="signinbutton" onClick={signInWithGoogle}>
            <FcGoogle className="googlelogo" />
            <> Sign In with Google</>
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
