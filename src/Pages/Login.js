import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/Login.css";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  // if website is used in desktop, then it will open google popup for login
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    // ...
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
